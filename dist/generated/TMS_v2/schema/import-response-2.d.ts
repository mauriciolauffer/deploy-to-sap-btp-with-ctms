/**
 * Representation of the 'ImportResponse2' schema.
 * @example {
 *   "actionId": 171,
 *   "monitoringURL": "/v2/actions/171"
 * }
 */
export type ImportResponse2 = {
    /**
     * Format: "int64".
     */
    actionId?: number;
    monitoringURL?: string;
} & Record<string, any>;
