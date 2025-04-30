import type { CtmsTransportRequest } from "./types/index.ts";
import * as core from "@actions/core";
import ctmsDeploy from "./ctms.js";

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
      contentType: core.getInput(
        "CTMS_TR_CONTENT_TYPE",
      ) as CtmsTransportRequest["contentType"],
      storageType: core.getInput(
        "CTMS_TR_STORAGE_TYPE",
      ) as CtmsTransportRequest["storageType"],
      username: core.getInput("CTMS_TR_USER_NAME"),
    };
    core.setSecret("CTMS_CLIENT_ID");
    core.setSecret("CTMS_CLIENT_SECRET");
    core.setSecret("CTMS_TR_USER_NAME");
    const transportRequest = await ctmsDeploy(
      ctmsParams,
      ctmsAuth,
      ctmsTransportRequest,
    );
    const queue = transportRequest.queueEntries[0];
    core.info(
      `Transport Request created: ${transportRequest.transportRequestDescription} (ID ${transportRequest.transportRequestId})`,
    );
    core.info(
      `File ${ctmsParams.filePath} uploaded to Queue ID ${queue.queueId}: ${queue.nodeName} (ID ${queue.nodeId})'`,
    );
    core.setOutput("CTMS_NODE_ID", queue.nodeId);
    core.setOutput("CTMS_NODE_NAME", queue.nodeName);
    core.setOutput("CTMS_QUEUE_ID", queue.queueId);
  } catch (err) {
    core.setFailed(`Action failed with error - ${err}`);
  }
}

await run();
