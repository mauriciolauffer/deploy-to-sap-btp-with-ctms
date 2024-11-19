import type { LogSeverity } from './log-severity';
/**
 * Representation of the 'LogMessageResponse2' schema.
 */
export type LogMessageResponse2 = {
    /**
     * Format: "int64".
     */
    id?: number;
    messageId?: string;
    severity?: LogSeverity;
    message?: string;
    /**
     * Format: "date-time".
     */
    createdAt?: string;
} & Record<string, any>;
