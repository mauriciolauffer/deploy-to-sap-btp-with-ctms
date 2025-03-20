import type { ExportEntity } from "./generated/TMS_v2/index";
import type { CtmsAuth, CtmsParams, CtmsTransportRequest } from "./types/index.ts";
/**
 * Deploy to Cloud Transport Management Service (cTMS)
 */
declare function ctmsDeploy(params: CtmsParams, auth: CtmsAuth, transportRequestParams: CtmsTransportRequest): Promise<ExportEntity>;
export default ctmsDeploy;
