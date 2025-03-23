/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'LoggingMonitoringApi'.
 * This API is part of the 'TMS_v2' service.
 */
export const LoggingMonitoringApi = {
    _defaultBasePath: undefined,
    /**
     * Returns properties of an action including transport requests
     *
     * @param actionId - Action ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    transportActionGetV2: (actionId) => new OpenApiRequestBuilder('get', '/actions/{actionId}', {
        pathParameters: { actionId }
    }, LoggingMonitoringApi._defaultBasePath),
    /**
     * Returns logs for a transport action
     * @param actionId - Action ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    transportActionLogsGetV2: (actionId) => new OpenApiRequestBuilder('get', '/actions/{actionId}/logs', {
        pathParameters: { actionId }
    }, LoggingMonitoringApi._defaultBasePath),
    /**
     * Returns logs for a transport request
     * @param nodeId - Node ID
     * @param transportRequestId - Transport Request ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getTransportRequestLogsUsingGet: (nodeId, transportRequestId) => new OpenApiRequestBuilder('get', '/nodes/{nodeId}/transportRequests/{transportRequestId}/logs', {
        pathParameters: { nodeId, transportRequestId }
    }, LoggingMonitoringApi._defaultBasePath)
};
//# sourceMappingURL=logging-monitoring-api.js.map