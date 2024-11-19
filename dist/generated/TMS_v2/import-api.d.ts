import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { TransportRequestsResponse2 } from './schema';
/**
 * Representation of the 'ImportApi'.
 * This API is part of the 'TMS_v2' service.
 */
export declare const ImportApi: {
    /**
     * Returns transport requests for a node
     * @param nodeId - Node ID
     * @param queryParameters - Object containing the following keys: status, createdAtFrom, createdAtTo, queuedAtFrom, queuedAtTo, owner.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeTrsGetV2: (nodeId: string, queryParameters: {
        status: string;
        createdAtFrom?: string;
        createdAtTo?: string;
        queuedAtFrom?: string;
        queuedAtTo?: string;
        owner?: string;
    }) => OpenApiRequestBuilder<TransportRequestsResponse2>;
    /**
     * Imports transport requests specified in request body. Request body must contain valid for import transport request IDs. If one of the IDs is invalid, the operation will fail
     *
     * @param nodeId - Node ID
     * @param body - Request body
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeImportSelectedV2: (nodeId: string, body: any | undefined) => OpenApiRequestBuilder<any>;
    /**
     * Import all importable transport requests of a node
     * @param nodeId - Node ID
     * @param body - Request body
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeImportAllV2: (nodeId: string, body: any | undefined) => OpenApiRequestBuilder<any>;
    /**
     * Forwards transport requests specified in request body. Request body must contain valid for forward transport request IDs. If one of the IDs is invalid, the operation will fail
     *
     * @param nodeId - Node ID
     * @param body - Request Body
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeForwardV2: (nodeId: string, body: any | undefined) => OpenApiRequestBuilder<any>;
    /**
     * Resets transport requests specified in request body. Request body must contain valid for reset transport request IDs. If one of the IDs is invalid, the operation will fail
     *
     * @param nodeId - Node ID
     * @param body - Request Body
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeResetV2: (nodeId: string, body: any | undefined) => OpenApiRequestBuilder<any>;
    /**
     * Removes transport requests specified in request body from the import queue of the node. Request body must contain valid for remove transport request IDs. If one of the IDs is invalid, the operation will fail
     *
     * @param nodeId - Node ID
     * @param body - Request Body
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    nodeTrsRemoveV2: (nodeId: string, body: any | undefined) => OpenApiRequestBuilder<any>;
};
