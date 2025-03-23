import type { ActionStatus } from './action-status.js';
/**
 * Representation of the 'ActionTREntityStatusResponse2' schema.
 */
export type ActionTREntityStatusResponse2 = {
    /**
     * Format: "int64".
     */
    id?: number;
    uri?: string;
    fileName?: string;
    status?: ActionStatus;
} & Record<string, any>;
