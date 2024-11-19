import type { ActionStatus } from './action-status';
import type { LogMessageResponse2 } from './log-message-response-2';
/**
 * Representation of the 'LogEntityResponse2' schema.
 */
export type LogEntityResponse2 = {
    /**
     * Format: "int64".
     */
    id?: number;
    uri?: string;
    fileName?: string;
    status?: ActionStatus;
    messages?: LogMessageResponse2[];
} & Record<string, any>;
