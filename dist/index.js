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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const ctms_1 = __importDefault(require("./ctms"));
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
    (0, ctms_1.default)();
}
catch (err) {
    core.setFailed(`Action failed with error - ${err}`);
}
//# sourceMappingURL=index.js.map