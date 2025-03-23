import type { PathLike } from "node:fs";
import type {
  ClientCredentialsResponse,
  HttpDestinationOrFetchOptions,
} from "@sap-cloud-sdk/connectivity";
import type {
  NodeExportBodyEntityName,
  FileInfo,
  ExportEntity,
} from "./generated/TMS_v2/index.js";
import type {
  CtmsAuth,
  CtmsParams,
  CtmsTransportRequest,
} from "./types/index.ts";
import { access, readFile } from "node:fs/promises";
import { basename } from "node:path";
import { URL, URLSearchParams } from "node:url";
import { FilesApi, ExportUploadApi } from "./generated/TMS_v2/index.js";

let CTMS_NODE_NAME: NodeExportBodyEntityName["nodeName"];
let CTMS_TR_DESCRIPTION: NodeExportBodyEntityName["description"];
let CTMS_TR_USER_NAME: NodeExportBodyEntityName["namedUser"];
let CTMS_TR_CONTENT_TYPE: NodeExportBodyEntityName["contentType"];
let CTMS_TR_STORAGE_TYPE: NodeExportBodyEntityName["storageType"];
let CTMS_FILE_PATH: PathLike = "";
let DESTINATION = {
  url: "",
  tokenServiceUrl: "",
  clientId: "",
  clientSecret: "",
} satisfies HttpDestinationOrFetchOptions;

/**
 * Set module variables
 */
function setModuleVariables(
  params: CtmsParams,
  auth: CtmsAuth,
  transportRequest: CtmsTransportRequest
) {
  CTMS_NODE_NAME = params.nodeName;
  CTMS_TR_DESCRIPTION = transportRequest.description;
  CTMS_TR_USER_NAME = transportRequest.username;
  CTMS_TR_CONTENT_TYPE = transportRequest.contentType;
  CTMS_TR_STORAGE_TYPE = transportRequest.storageType;
  CTMS_FILE_PATH = params.filePath;
  DESTINATION = {
    url: params.apiUrl || "",
    tokenServiceUrl: auth.tokenServiceUrl || "",
    clientId: auth.clientId || "",
    clientSecret: auth.clientSecret || "",
  };

  console.log("CTMS");
  console.log("CTMS_TOKEN_SERVICE_URL: ", DESTINATION.tokenServiceUrl);
  console.log("CTMS_CLIENT_ID: ", DESTINATION.clientId);
  console.log("CTMS_CLIENT_SECRET: ", DESTINATION.clientSecret);
  console.log("CTMS_API_URL: ", DESTINATION.url);
  console.log("CTMS_NODE_NAME: ", CTMS_NODE_NAME);
  console.log("CTMS_FILE_PATH: ", CTMS_FILE_PATH);
  console.log("CTMS_TR_DESCRIPTION: ", CTMS_TR_DESCRIPTION);
  console.log("CTMS_TR_CONTENT_TYPE: ", CTMS_TR_CONTENT_TYPE);
  console.log("CTMS_TR_STORAGE_TYPE: ", CTMS_TR_STORAGE_TYPE);
  console.log("CTMS_TR_USER_NAME: ", CTMS_TR_USER_NAME);
}

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
  if (!CTMS_FILE_PATH) {
    throw new Error("FILE PATH cannot be empty");
  }
  if (!DESTINATION.url) {
    throw new Error("API URL cannot be empty");
  }
  if (!DESTINATION.tokenServiceUrl) {
    throw new Error("TOKEN SERVICE URL cannot be empty");
  }
  if (!CTMS_NODE_NAME) {
    throw new Error("NODE NAME cannot be empty");
  }
  if (!CTMS_TR_CONTENT_TYPE) {
    throw new Error("CONTENT TYPE cannot be empty");
  }
  if (!CTMS_TR_STORAGE_TYPE) {
    throw new Error("STORAGE TYPE cannot be empty");
  }
  console.info(1111111111);
  console.info(`Validating file: ${CTMS_FILE_PATH}`);
  console.info(import.meta.url);
  console.info(import.meta.dirname);
  console.info(import.meta.filename);
  await access(CTMS_FILE_PATH);
  new URL(DESTINATION.url); // eslint-disable-line
  new URL(DESTINATION.tokenServiceUrl); // eslint-disable-line
}

/**
 * Get OAuth2 authentication token
 */
async function getAuthToken(): Promise<ClientCredentialsResponse> {
  const { tokenServiceUrl, clientId, clientSecret } = DESTINATION;
  console.info(`Authenticating to: ${tokenServiceUrl}`); // eslint-disable-line no-console
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
  console.info(`Uploading file: ${CTMS_FILE_PATH}`); // eslint-disable-line no-console
  const blob = new Blob([await readFile(CTMS_FILE_PATH)]);
  const payload = new FormData();
  const fileName = basename(CTMS_FILE_PATH as string);
  payload.append("namedUser", CTMS_TR_USER_NAME);
  payload.append("file", blob, fileName);
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
  console.info(`Adding file to the Transport Node Queue: ${CTMS_NODE_NAME}`); // eslint-disable-line no-console
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
async function ctmsDeploy(
  params: CtmsParams,
  auth: CtmsAuth,
  transportRequestParams: CtmsTransportRequest
): Promise<ExportEntity> {
  setModuleVariables(params, auth, transportRequestParams);
  await validateInput();
  return createTransportRequest();
}

export default ctmsDeploy;
