"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const core = __importStar(require("@actions/core"));
const index_1 = require("./generated/TMS_v2/index");
const CTMS_NODE_NAME = process.env.CTMS_NODE_NAME || "";
const USER_NAME = process.env.USER_NAME || undefined;
const FILE_PATH = process.env.FILE_PATH || "";
const FILENAME = (0, node_path_1.basename)(FILE_PATH);
const DESTINATION = {
    url: process.env.CTMS_URL || "",
    tokenServiceUrl: process.env.TOKEN_SERVICE_URL || "",
    clientId: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    // authentication: "OAuth2ClientCredentials"
};
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
    await (0, promises_1.access)(FILE_PATH);
    if (!DESTINATION.url) {
        throw new Error("CTMS_URL cannot be empty");
    }
    if (!DESTINATION.tokenServiceUrl) {
        throw new Error("TOKEN_SERVICE_URL cannot be empty");
    }
    if (!CTMS_NODE_NAME) {
        throw new Error("CTMS_NODE_NAME cannot be empty");
    }
    new node_url_1.URL(DESTINATION.url); // eslint-disable-line
    new node_url_1.URL(DESTINATION.tokenServiceUrl); // eslint-disable-line
}
/**
 * Get OAuth2 authentication token
 */
async function getAuthToken() {
    const { tokenServiceUrl, clientId, clientSecret } = DESTINATION;
    core.info(`Authenticating to: ${tokenServiceUrl}`);
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
    core.info(`Uploading file: ${FILE_PATH}`);
    const blob = new Blob([await (0, promises_1.readFile)(FILE_PATH)]);
    const payload = new FormData();
    payload.append("namedUser", USER_NAME);
    payload.append("file", blob, FILENAME);
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
    core.info(`Adding file to the Transport Node Queue: ${CTMS_NODE_NAME}`);
    const payload = {
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
async function ctmsDeploy() {
    await validateInput();
    const transportRequest = await createTransportRequest();
    const queue = transportRequest.queueEntries[0];
    core.info(`Transport Request created: ${transportRequest.transportRequestDescription} (ID ${transportRequest.transportRequestId})`);
    core.info(`File ${FILENAME} uploaded to Queue ID ${queue.queueId}: ${queue.nodeName} (ID ${queue.nodeId})'`);
}
exports.default = ctmsDeploy;
//# sourceMappingURL=ctms.js.map