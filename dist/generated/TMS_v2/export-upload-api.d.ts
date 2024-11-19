import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { NodeExportBodyEntityName, ExportEntity } from './schema';
/**
 * Representation of the 'ExportUploadApi'.
 * This API is part of the 'TMS_v2' service.
 */
export declare const ExportUploadApi: {
    /**
     * Creates a transport request containing (multiple) file or application-specific references.  The export node is identified by its name. The transport request is added to the queues of the follow-on nodes of export node.
     * @param body - Request body
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeExportByNameV2: (body: NodeExportBodyEntityName) => OpenApiRequestBuilder<ExportEntity>;
    /**
     * Creates a transport request with content specified by the File Upload operation or a by an application-specific reference.  The upload node is identified by its name. The transport request is added to the queue of the upload node.
     * @param body - Request body
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeUploadByNameV2: (body: NodeExportBodyEntityName) => OpenApiRequestBuilder<ExportEntity>;
};
