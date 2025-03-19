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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const core = __importStar(require("@actions/core"));
const index_1 = require("./generated/TMS_v2/index");
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
const CTMS_NODE_NAME = process.env.CTMS_NODE_NAME || "";
const CTMS_TR_DESCRIPTION = process.env.CTMS_TR_DESCRIPTION || "";
const CTMS_TR_USER_NAME = process.env.CTMS_TR_USER_NAME || undefined;
const CTMS_TR_CONTENT_TYPE = process.env.CTMS_TR_CONTENT_TYPE;
const CTMS_TR_STORAGE_TYPE = process.env.CTMS_TR_STORAGE_TYPE;
const CTMS_FILE_PATH = process.env.CTMS_FILE_PATH || "";
const FILENAME = (0, node_path_1.basename)(CTMS_FILE_PATH);
const DESTINATION = {
    url: process.env.CTMS_API_URL || "",
    tokenServiceUrl: process.env.CTMS_TOKEN_SERVICE_URL || "",
    clientId: process.env.CTMS_CLIENT_ID || "",
    clientSecret: process.env.CTMS_CLIENT_SECRET || "",
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
    await (0, promises_1.access)(CTMS_FILE_PATH);
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
    core.info(`Uploading file: ${CTMS_FILE_PATH}`);
    const blob = new Blob([await (0, promises_1.readFile)(CTMS_FILE_PATH)]);
    const payload = new FormData();
    payload.append("namedUser", CTMS_TR_USER_NAME);
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
async function ctmsDeploy() {
    await validateInput();
    const transportRequest = await createTransportRequest();
    const queue = transportRequest.queueEntries[0];
    core.info(`Transport Request created: ${transportRequest.transportRequestDescription} (ID ${transportRequest.transportRequestId})`);
    core.info(`File ${FILENAME} uploaded to Queue ID ${queue.queueId}: ${queue.nodeName} (ID ${queue.nodeId})'`);
}
exports.default = ctmsDeploy;
//# sourceMappingURL=ctms.js.map