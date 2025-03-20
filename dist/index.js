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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const ctms_1 = __importDefault(require("./ctms"));
/**
 * Main function  to run the action
 */
async function run() {
    try {
        core.info("Starting SAP BTP cTMS deployment...");
        const ctmsAuth = {
            tokenServiceUrl: core.getInput("CTMS_TOKEN_SERVICE_URL"),
            clientId: core.getInput("CTMS_CLIENT_ID"),
            clientSecret: core.getInput("CTMS_CLIENT_SECRET"),
        };
        const ctmsParams = {
            apiUrl: core.getInput("CTMS_API_URL"),
            nodeName: core.getInput("CTMS_NODE_NAME"),
            filePath: core.getInput("CTMS_FILE_PATH"),
        };
        const ctmsTransportRequest = {
            description: core.getInput("CTMS_TR_DESCRIPTION"),
            contentType: core.getInput("CTMS_TR_CONTENT_TYPE"),
            storageType: core.getInput("CTMS_TR_STORAGE_TYPE"),
            username: core.getInput("CTMS_TR_USER_NAME"),
        };
        core.setSecret("CTMS_CLIENT_ID");
        core.setSecret("CTMS_CLIENT_SECRET");
        core.setSecret("CTMS_TR_USER_NAME");
        console.log("INDEX");
        console.log("CTMS_TOKEN_SERVICE_URL: ", core.getInput("CTMS_TOKEN_SERVICE_URL"));
        console.log("CTMS_CLIENT_ID: ", core.getInput("CTMS_CLIENT_ID"));
        console.log("CTMS_CLIENT_SECRET: ", core.getInput("CTMS_CLIENT_SECRET"));
        console.log("CTMS_API_URL: ", core.getInput("CTMS_API_URL"));
        console.log("CTMS_NODE_NAME: ", core.getInput("CTMS_NODE_NAME"));
        console.log("CTMS_FILE_PATH: ", core.getInput("CTMS_FILE_PATH"));
        console.log("CTMS_TR_DESCRIPTION: ", core.getInput("CTMS_TR_DESCRIPTION"));
        console.log("CTMS_TR_CONTENT_TYPE: ", core.getInput("CTMS_TR_CONTENT_TYPE"));
        console.log("CTMS_TR_STORAGE_TYPE: ", core.getInput("CTMS_TR_STORAGE_TYPE"));
        console.log("CTMS_TR_USER_NAME: ", core.getInput("CTMS_TR_USER_NAME"));
        const transportRequest = await (0, ctms_1.default)(ctmsParams, ctmsAuth, ctmsTransportRequest);
        const queue = transportRequest.queueEntries[0];
        core.info(`Transport Request created: ${transportRequest.transportRequestDescription} (ID ${transportRequest.transportRequestId})`);
        core.info(`File ${ctmsParams.filePath} uploaded to Queue ID ${queue.queueId}: ${queue.nodeName} (ID ${queue.nodeId})'`);
    }
    catch (err) {
        core.setFailed(`Action failed with error - ${err}`);
    }
}
(async () => {
    await run();
})();
//# sourceMappingURL=index.js.map