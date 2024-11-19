/**
 * Representation of the 'TmsExceptionObject' schema.
 * @example {
 *   "message": "Node ID 117 does not exist",
 *   "errorType": "com.sap.lm.sl.alm.ts.core.exception.service.TsNotFoundException"
 * }
 */
export type TmsExceptionObject = {
    errorType?: string;
    message?: string;
} & Record<string, any>;
