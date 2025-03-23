import type { StorageType } from './storage-type.js';
import type { ContentType } from './content-type.js';
/**
 * Representation of the 'QueueEntryEntry2' schema.
 */
export type QueueEntryEntry2 = {
    /**
     * Format: "int64".
     */
    id?: number;
    storageType?: StorageType;
    contentType?: ContentType;
    uri?: string;
} & Record<string, any>;
