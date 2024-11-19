"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMonitoringApi = void 0;
/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'LoggingMonitoringApi'.
 * This API is part of the 'TMS_v2' service.
 */
exports.LoggingMonitoringApi = {
    /**
     * Returns properties of an action including transport requests
     *
     * @param actionId - Action ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    transportActionGetV2: (actionId) => new openapi_1.OpenApiRequestBuilder('get', '/actions/{actionId}', {
        pathParameters: { actionId }
    }),
    /**
     * Returns logs for a transport action
     * @param actionId - Action ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    transportActionLogsGetV2: (actionId) => new openapi_1.OpenApiRequestBuilder('get', '/actions/{actionId}/logs', {
        pathParameters: { actionId }
    }),
    /**
     * Returns logs for a transport request
     * @param nodeId - Node ID
     * @param transportRequestId - Transport Request ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getTransportRequestLogsUsingGet: (nodeId, transportRequestId) => new openapi_1.OpenApiRequestBuilder('get', '/nodes/{nodeId}/transportRequests/{transportRequestId}/logs', {
        pathParameters: { nodeId, transportRequestId }
    })
};
//# sourceMappingURL=logging-monitoring-api.js.map