import type {PathLike} from "node:fs";
import type { ClientCredentialsResponse, HttpDestinationOrFetchOptions } from "@sap-cloud-sdk/connectivity";
import type {
  NodeExportBodyEntityName,
  FileInfo,
  ExportEntity,
} from "./generated/TMS_v2/index";
import { access, readFile } from "node:fs/promises";
import { basename } from "node:path";
import { URL, URLSearchParams } from "node:url";
import * as core from "@actions/core";
import { FilesApi, ExportUploadApi } from "./generated/TMS_v2/index";

const CTMS_NODE_NAME = process.env.CTMS_NODE_NAME || "";
const USER_NAME = process.env.USER_NAME || undefined;
const FILE_PATH:PathLike = process.env.FILE_PATH || "";
const FILENAME = basename(FILE_PATH);
const DESTINATION = {
  url: process.env.CTMS_URL || "",
  tokenServiceUrl: process.env.TOKEN_SERVICE_URL || "",
  clientId: process.env.CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
  // authentication: "OAuth2ClientCredentials"
} satisfies HttpDestinationOrFetchOptions;

/**
 * Handle fetch responses
 */
async function processFetchResponse(
  response: Response
): Promise<ClientCredentialsResponse> {
  if (response.ok) {
    return response.json() as Promise<ClientCredentialsResponse>;
  } else {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`, {
      cause: await response.json(),
    });
  }
}

/**
 * Validate user/system input
 */
async function validateInput() {
  await access(FILE_PATH);
  if (!DESTINATION.url) {
    throw new Error("CTMS_URL cannot be empty");
  }
  if (!DESTINATION.tokenServiceUrl) {
    throw new Error("TOKEN_SERVICE_URL cannot be empty");
  }
  if (!CTMS_NODE_NAME) {
    throw new Error("CTMS_NODE_NAME cannot be empty");
  }
  new URL(DESTINATION.url); // eslint-disable-line
  new URL(DESTINATION.tokenServiceUrl); // eslint-disable-line
}

/**
 * Get OAuth2 authentication token
 */
async function getAuthToken(): Promise<ClientCredentialsResponse> {
  const { tokenServiceUrl, clientId, clientSecret } = DESTINATION;
  core.info(`Authenticating to: ${tokenServiceUrl}`);
  const encodedAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  const payload = new URLSearchParams();
  payload.append("grant_type", "client_credentials");
  payload.append("client_id", clientId);
  try {
    const response = await fetch(tokenServiceUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${encodedAuth}`,
      },
      body: payload,
    });
    return processFetchResponse(response);
  } catch (err) {
    throw new Error(`Error getting authorization token`, { cause: err });
  }
}

/**
 * Upload MTA file to CTMS
 */
async function uploadMtaFile(oauthToken: string): Promise<FileInfo> {
  core.info(`Uploading file: ${FILE_PATH}`);
  const blob = new Blob([await readFile(FILE_PATH)]);
  const payload = new FormData();
  payload.append("namedUser", USER_NAME);
  payload.append("file", blob, FILENAME);

  return FilesApi.fileUploadV2(payload)
    .skipCsrfTokenFetching()
    .addCustomHeaders({
      Authorization: `Bearer ${oauthToken}`,
    })
    .execute(DESTINATION);
}

/**
 * Add MTA file to cTMS Transport Node Queue
 */
async function addFileToTransportNodeQueue(
  fileId: string,
  fileName: string,
  oauthToken: string
): Promise<ExportEntity> {
  core.info(`Adding file to the Transport Node Queue: ${CTMS_NODE_NAME}`);
  const payload: NodeExportBodyEntityName = {
    nodeName: CTMS_NODE_NAME,
    contentType: "MTA",
    storageType: "FILE",
    entries: [
      {
        uri: fileId,
      },
    ],
    description: `Upload via API - ${fileName}`,
    namedUser: USER_NAME,
  };
  return ExportUploadApi.nodeUploadByNameV2(payload)
    .skipCsrfTokenFetching()
    .addCustomHeaders({
      Authorization: `Bearer ${oauthToken}`,
    })
    .execute(DESTINATION);
}

/**
 * Create a Transport Request in cTMS
 */
async function createTransportRequest(): Promise<ExportEntity> {
  const { access_token } = await getAuthToken();
  const fileInfo = await uploadMtaFile(access_token);
  return addFileToTransportNodeQueue(
    (fileInfo?.fileId || "").toString(),
    fileInfo?.fileName || "",
    access_token
  );
}

/**
 * Deploy to Cloud Transport Management Service (cTMS)
 */
async function ctmsDeploy() {
  await validateInput();
  const transportRequest = await createTransportRequest();
  const queue = transportRequest.queueEntries[0];
  core.info(
    `Transport Request created: ${transportRequest.transportRequestDescription} (ID ${transportRequest.transportRequestId})`
  );
  core.info(
    `File ${FILENAME} uploaded to Queue ID ${queue.queueId}: ${queue.nodeName} (ID ${queue.nodeId})'`
  );
}

export default ctmsDeploy;
