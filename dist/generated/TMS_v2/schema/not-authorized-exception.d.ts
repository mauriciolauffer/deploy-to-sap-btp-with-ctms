/**
 * Representation of the 'NotAuthorizedException' schema.
 * @example {
 *   "error": "unauthorized",
 *   "error_description": "Full authentication is required to access this resource"
 * }
 */
export type NotAuthorizedException = {
    error?: string;
    error_description?: string;
} & Record<string, any>;
