/**
 * Representation of the 'ExceptionObject' schema.
 * @example {
 *   "errorType": "TsInternalServerErrorException",
 *   "message": "The application has encountered an unexpected error."
 * }
 */
export type ExceptionObject = {
    errorType?: string;
    message?: string;
} & Record<string, any>;
