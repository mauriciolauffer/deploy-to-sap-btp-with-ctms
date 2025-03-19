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

    console.log("CTMS_TOKEN_SERVICE_URL: ", process.env.CTMS_TOKEN_SERVICE_URL);
    console.log("CTMS_CLIENT_ID: ", process.env.CTMS_CLIENT_ID);
    console.log("CTMS_CLIENT_SECRET: ", process.env.CTMS_CLIENT_SECRET);
    console.log("CTMS_API_URL: ", process.env.CTMS_API_URL);
    console.log("CTMS_NODE_NAME: ", process.env.CTMS_NODE_NAME);
    console.log("CTMS_FILE_PATH: ", process.env.CTMS_FILE_PATH);
    console.log("CTMS_TR_DESCRIPTION: ", process.env.CTMS_TR_DESCRIPTION);
    console.log("CTMS_TR_CONTENT_TYPE: ", process.env.CTMS_TR_CONTENT_TYPE);
    console.log("CTMS_TR_STORAGE_TYPE: ", process.env.CTMS_TR_STORAGE_TYPE);
    console.log("CTMS_TR_USER_NAME: ", process.env.CTMS_TR_USER_NAME);


const CTMS_NODE_NAME:NodeExportBodyEntityName["nodeName"] = process.env.CTMS_NODE_NAME || "";
const CTMS_TR_DESCRIPTION:NodeExportBodyEntityName["description"] = process.env.CTMS_TR_DESCRIPTION || "";
const CTMS_TR_USER_NAME:NodeExportBodyEntityName["namedUser"] = process.env.CTMS_TR_USER_NAME || undefined;
const CTMS_TR_CONTENT_TYPE = process.env.CTMS_TR_CONTENT_TYPE as NodeExportBodyEntityName["contentType"];
const CTMS_TR_STORAGE_TYPE = process.env.CTMS_TR_STORAGE_TYPE as NodeExportBodyEntityName["storageType"];
const CTMS_FILE_PATH:PathLike = process.env.CTMS_FILE_PATH || "";
const FILENAME = basename(CTMS_FILE_PATH);
const DESTINATION = {
  url: process.env.CTMS_API_URL || "",
  tokenServiceUrl: process.env.CTMS_TOKEN_SERVICE_URL || "",
  clientId: process.env.CTMS_CLIENT_ID || "",
  clientSecret: process.env.CTMS_CLIENT_SECRET || "",
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
  await access(CTMS_FILE_PATH);
  if (!DESTINATION.url) {
    throw new Error("CTMS_API_URL cannot be empty");
  }
  if (!DESTINATION.tokenServiceUrl) {
    throw new Error("CTMS_TOKEN_SERVICE_URL cannot be empty");
  }
  if (!CTMS_NODE_NAME) {
    throw new Error("CTMS_NODE_NAME cannot be empty");
  }
  if (!CTMS_TR_CONTENT_TYPE) {
    throw new Error("CTMS_TR_CONTENT_TYPE cannot be empty");
  }
  if (!CTMS_TR_STORAGE_TYPE) {
    throw new Error("CTMS_TR_STORAGE_TYPE cannot be empty");
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
  core.info(`Uploading file: ${CTMS_FILE_PATH}`);
  const blob = new Blob([await readFile(CTMS_FILE_PATH)]);
  const payload = new FormData();
  payload.append("namedUser", CTMS_TR_USER_NAME);
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
    contentType: CTMS_TR_CONTENT_TYPE,
    storageType: CTMS_TR_STORAGE_TYPE,
    entries: [
      {
        uri: fileId,
      },
    ],
    description: CTMS_TR_DESCRIPTION,
    namedUser: CTMS_TR_USER_NAME,
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
