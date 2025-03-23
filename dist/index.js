import * as core from '@actions/core';
import ctmsDeploy from './ctms.js';
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
        const transportRequest = await ctmsDeploy(ctmsParams, ctmsAuth, ctmsTransportRequest);
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