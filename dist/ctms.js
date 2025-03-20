"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const index_1 = require("./generated/TMS_v2/index");
let CTMS_NODE_NAME;
let CTMS_TR_DESCRIPTION;
let CTMS_TR_USER_NAME;
let CTMS_TR_CONTENT_TYPE;
let CTMS_TR_STORAGE_TYPE;
let CTMS_FILE_PATH = "";
let DESTINATION = {
    url: "",
    tokenServiceUrl: "",
    clientId: "",
    clientSecret: "",
};
/**
 * Set module variables
 */
function setModuleVariables(params, auth, transportRequest) {
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
async function processFetchResponse(response) {
    if (response.ok) {
        return response.json();
    }
    else {
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
    await (0, promises_1.access)(CTMS_FILE_PATH);
    new node_url_1.URL(DESTINATION.url); // eslint-disable-line
    new node_url_1.URL(DESTINATION.tokenServiceUrl); // eslint-disable-line
}
/**
 * Get OAuth2 authentication token
 */
async function getAuthToken() {
    const { tokenServiceUrl, clientId, clientSecret } = DESTINATION;
    console.info(`Authenticating to: ${tokenServiceUrl}`); // eslint-disable-line no-console
    const encodedAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const payload = new node_url_1.URLSearchParams();
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
    }
    catch (err) {
        throw new Error(`Error getting authorization token`, { cause: err });
    }
}
/**
 * Upload MTA file to CTMS
 */
async function uploadMtaFile(oauthToken) {
    console.info(`Uploading file: ${CTMS_FILE_PATH}`); // eslint-disable-line no-console
    const blob = new Blob([await (0, promises_1.readFile)(CTMS_FILE_PATH)]);
    const payload = new FormData();
    const fileName = (0, node_path_1.basename)(CTMS_FILE_PATH);
    payload.append("namedUser", CTMS_TR_USER_NAME);
    payload.append("file", blob, fileName);
    return index_1.FilesApi.fileUploadV2(payload)
        .skipCsrfTokenFetching()
        .addCustomHeaders({
        Authorization: `Bearer ${oauthToken}`,
    })
        .execute(DESTINATION);
}
/**
 * Add MTA file to cTMS Transport Node Queue
 */
async function addFileToTransportNodeQueue(fileId, fileName, oauthToken) {
    console.info(`Adding file to the Transport Node Queue: ${CTMS_NODE_NAME}`); // eslint-disable-line no-console
    const payload = {
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
    return index_1.ExportUploadApi.nodeUploadByNameV2(payload)
        .skipCsrfTokenFetching()
        .addCustomHeaders({
        Authorization: `Bearer ${oauthToken}`,
    })
        .execute(DESTINATION);
}
/**
 * Create a Transport Request in cTMS
 */
async function createTransportRequest() {
    const { access_token } = await getAuthToken();
    const fileInfo = await uploadMtaFile(access_token);
    return addFileToTransportNodeQueue((fileInfo?.fileId || "").toString(), fileInfo?.fileName || "", access_token);
}
/**
 * Deploy to Cloud Transport Management Service (cTMS)
 */
async function ctmsDeploy(params, auth, transportRequestParams) {
    setModuleVariables(params, auth, transportRequestParams);
    await validateInput();
    return createTransportRequest();
}
exports.default = ctmsDeploy;
//# sourceMappingURL=ctms.js.map