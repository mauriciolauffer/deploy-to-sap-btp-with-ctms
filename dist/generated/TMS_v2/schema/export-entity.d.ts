import type { ExportQueueEntryInfo } from './export-queue-entry-info';
/**
 * Representation of the 'ExportEntity' schema.
 * @example {
 *   "queueEntries": [
 *     {
 *       "nodeId": 226,
 *       "nodeName": "PROD",
 *       "queueId": 354
 *     }
 *   ],
 *   "transportRequestDescription": "export/upload of 2 MTAs",
 *   "transportRequestId": 352
 * }
 */
export type ExportEntity = {
    queueEntries: ExportQueueEntryInfo[];
    /**
     * Transport request description
     */
    transportRequestDescription: string;
    /**
     * Transport request ID
     * Format: "int64".
     */
    transportRequestId: number;
} & Record<string, any>;
