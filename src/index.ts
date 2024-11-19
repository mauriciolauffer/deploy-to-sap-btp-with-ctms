import * as core from '@actions/core';
import ctmsDeploy from './ctms';

try {
  core.info("Starting SAP BTP cTMS deployment...");
  process.env.TOKEN_SERVICE_URL = core.getInput("TOKEN_SERVICE_URL");
  process.env.CLIENT_ID = core.getInput("CLIENT_ID");
  process.env.CLIENT_SECRET = core.getInput("CLIENT_SECRET");
  process.env.CTMS_URL = core.getInput("CTMS_URL");
  process.env.CTMS_NODE_NAME = core.getInput("CTMS_NODE_NAME");
  process.env.USER_NAME = core.getInput("USER_NAME");
  process.env.FILE_PATH = core.getInput("FILE_PATH");
  core.setSecret("CLIENT_ID");
  core.setSecret("CLIENT_SECRET");

  ctmsDeploy();
} catch (err) {
  core.setFailed(`Action failed with error - ${err}`);
}
