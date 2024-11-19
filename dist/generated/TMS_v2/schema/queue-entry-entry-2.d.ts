import type { StorageType } from './storage-type';
import type { ContentType } from './content-type';
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
