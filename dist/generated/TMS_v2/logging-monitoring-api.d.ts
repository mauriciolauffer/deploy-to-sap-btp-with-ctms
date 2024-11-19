import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { ActionResponse2, LogsResponse2, TrLogsResponse2 } from './schema';
/**
 * Representation of the 'LoggingMonitoringApi'.
 * This API is part of the 'TMS_v2' service.
 */
export declare const LoggingMonitoringApi: {
    /**
     * Returns properties of an action including transport requests
     *
     * @param actionId - Action ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    transportActionGetV2: (actionId: string) => OpenApiRequestBuilder<ActionResponse2>;
    /**
     * Returns logs for a transport action
     * @param actionId - Action ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    transportActionLogsGetV2: (actionId: string) => OpenApiRequestBuilder<LogsResponse2>;
    /**
     * Returns logs for a transport request
     * @param nodeId - Node ID
     * @param transportRequestId - Transport Request ID
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    getTransportRequestLogsUsingGet: (nodeId: string, transportRequestId: string) => OpenApiRequestBuilder<TrLogsResponse2>;
};
