/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  TransportRequestsResponse2,
  TransportRequestsBodyEntity2,
  ImportResponse2,
  TransportRequestsBodyEntityImpAll2
} from './schema/index.js';
/**
 * Representation of the 'ImportApi'.
 * This API is part of the 'TMS_v2' service.
 */
export const ImportApi = {
  _defaultBasePath: undefined,
  /**
   * Returns transport requests for a node
   * @param nodeId - Node ID
   * @param queryParameters - Object containing the following keys: status, createdAtFrom, createdAtTo, queuedAtFrom, queuedAtTo, owner.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeTrsGetV2: (
    nodeId: string,
    queryParameters: {
      status: string;
      createdAtFrom?: string;
      createdAtTo?: string;
      queuedAtFrom?: string;
      queuedAtTo?: string;
      owner?: string;
    }
  ) =>
    new OpenApiRequestBuilder<TransportRequestsResponse2>(
      'get',
      '/nodes/{nodeId}/transportRequests',
      {
        pathParameters: { nodeId },
        queryParameters
      },
      ImportApi._defaultBasePath
    ),
  /**
   * Imports transport requests specified in request body. Request body must contain valid for import transport request IDs. If one of the IDs is invalid, the operation will fail
   *
   * @param nodeId - Node ID
   * @param body - Request body
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeImportSelectedV2: (
    nodeId: string,
    body: TransportRequestsBodyEntity2 | undefined
  ) =>
    new OpenApiRequestBuilder<ImportResponse2>(
      'post',
      '/nodes/{nodeId}/transportRequests/import',
      {
        pathParameters: { nodeId },
        body
      },
      ImportApi._defaultBasePath
    ),
  /**
   * Import all importable transport requests of a node
   * @param nodeId - Node ID
   * @param body - Request body
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeImportAllV2: (
    nodeId: string,
    body: TransportRequestsBodyEntityImpAll2 | undefined
  ) =>
    new OpenApiRequestBuilder<ImportResponse2>(
      'post',
      '/nodes/{nodeId}/transportRequests/importAll',
      {
        pathParameters: { nodeId },
        body
      },
      ImportApi._defaultBasePath
    ),
  /**
   * Forwards transport requests specified in request body. Request body must contain valid for forward transport request IDs. If one of the IDs is invalid, the operation will fail
   *
   * @param nodeId - Node ID
   * @param body - Request Body
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeForwardV2: (
    nodeId: string,
    body: TransportRequestsBodyEntity2 | undefined
  ) =>
    new OpenApiRequestBuilder<any>(
      'post',
      '/nodes/{nodeId}/transportRequests/forward',
      {
        pathParameters: { nodeId },
        body
      },
      ImportApi._defaultBasePath
    ),
  /**
   * Resets transport requests specified in request body. Request body must contain valid for reset transport request IDs. If one of the IDs is invalid, the operation will fail
   *
   * @param nodeId - Node ID
   * @param body - Request Body
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeResetV2: (
    nodeId: string,
    body: TransportRequestsBodyEntity2 | undefined
  ) =>
    new OpenApiRequestBuilder<any>(
      'post',
      '/nodes/{nodeId}/transportRequests/reset',
      {
        pathParameters: { nodeId },
        body
      },
      ImportApi._defaultBasePath
    ),
  /**
   * Removes transport requests specified in request body from the import queue of the node. Request body must contain valid for remove transport request IDs. If one of the IDs is invalid, the operation will fail
   *
   * @param nodeId - Node ID
   * @param body - Request Body
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeTrsRemoveV2: (
    nodeId: string,
    body: TransportRequestsBodyEntity2 | undefined
  ) =>
    new OpenApiRequestBuilder<any>(
      'post',
      '/nodes/{nodeId}/transportRequests/remove',
      {
        pathParameters: { nodeId },
        body
      },
      ImportApi._defaultBasePath
    )
};
