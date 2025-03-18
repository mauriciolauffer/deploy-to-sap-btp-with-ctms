import * as core from '@actions/core';
import ctmsDeploy from './ctms';

/**
 * Main function  to run the action
 */
async function run() {
  try {
    core.info("Starting SAP BTP cTMS deployment...");
    process.env.CTMS_TOKEN_SERVICE_URL = core.getInput("CTMS_TOKEN_SERVICE_URL");
    process.env.CTMS_CLIENT_ID = core.getInput("CTMS_CLIENT_ID");
    process.env.CTMS_CLIENT_SECRET = core.getInput("CTMS_CLIENT_SECRET");
    process.env.CTMS_API_URL = core.getInput("CTMS_API_URL");
    process.env.CTMS_NODE_NAME = core.getInput("CTMS_NODE_NAME");
    process.env.CTMS_FILE_PATH = core.getInput("CTMS_FILE_PATH");
    process.env.CTMS_TR_DESCRIPTION = core.getInput("CTMS_TR_DESCRIPTION");
    process.env.CTMS_TR_CONTENT_TYPE = core.getInput("CTMS_TR_CONTENT_TYPE");
    process.env.CTMS_TR_STORAGE_TYPE = core.getInput("CTMS_TR_STORAGE_TYPE");
    process.env.CTMS_TR_USER_NAME = core.getInput("CTMS_TR_USER_NAME");
  
    core.setSecret("CTMS_CLIENT_ID");
    core.setSecret("CTMS_CLIENT_SECRET");
  
    await ctmsDeploy();
  } catch (err) {
    core.setFailed(`Action failed with error - ${err}`);
  }
}

(async () => {
  await run();
})();
