/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ActionResponse2, LogsResponse2, TrLogsResponse2 } from './schema';
/**
 * Representation of the 'LoggingMonitoringApi'.
 * This API is part of the 'TMS_v2' service.
 */
export const LoggingMonitoringApi = {
  /**
   * Returns properties of an action including transport requests
   *
   * @param actionId - Action ID
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  transportActionGetV2: (actionId: string) =>
    new OpenApiRequestBuilder<ActionResponse2>('get', '/actions/{actionId}', {
      pathParameters: { actionId }
    }),
  /**
   * Returns logs for a transport action
   * @param actionId - Action ID
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  transportActionLogsGetV2: (actionId: string) =>
    new OpenApiRequestBuilder<LogsResponse2>(
      'get',
      '/actions/{actionId}/logs',
      {
        pathParameters: { actionId }
      }
    ),
  /**
   * Returns logs for a transport request
   * @param nodeId - Node ID
   * @param transportRequestId - Transport Request ID
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getTransportRequestLogsUsingGet: (
    nodeId: string,
    transportRequestId: string
  ) =>
    new OpenApiRequestBuilder<TrLogsResponse2>(
      'get',
      '/nodes/{nodeId}/transportRequests/{transportRequestId}/logs',
      {
        pathParameters: { nodeId, transportRequestId }
      }
    )
};
