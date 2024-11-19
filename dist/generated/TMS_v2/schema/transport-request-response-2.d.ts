import type { TRStatus } from './tr-status';
import type { QueueEntryEntry2 } from './queue-entry-entry-2';
/**
 * Representation of the 'TransportRequestResponse2' schema.
 */
export type TransportRequestResponse2 = {
    /**
     * Format: "int64".
     */
    id?: number;
    status?: TRStatus;
    archived?: boolean;
    /**
     * Format: "int64".
     */
    position?: number;
    createdBy?: string;
    createdByNamedUser?: string;
    /**
     * Format: "date-time".
     */
    createdAt?: string;
    /**
     * Format: "date-time".
     */
    queuedAt?: string;
    description?: string;
    origin?: string;
    entries?: QueueEntryEntry2[];
} & Record<string, any>;
