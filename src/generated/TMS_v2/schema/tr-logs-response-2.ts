/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { TrLogResponse2 } from './tr-log-response-2.js';
/**
 * Representation of the 'TrLogsResponse2' schema.
 * @example {
 *   "logs": [
 *     {
 *       "actionId": 28,
 *       "actionType": "I",
 *       "status": "succeeded",
 *       "actionStartedAt": "2019-07-22T12:30:10.175Z",
 *       "actionTriggeredBy": "d7ad0010-09a7-4916-be8d-1166c653e0c7",
 *       "actionTriggeredByNamedUser": "d012345",
 *       "messages": [
 *         {
 *           "id": 54,
 *           "messageId": "TRANSPORTREQUEST_END",
 *           "severity": "I",
 *           "message": "Import ended for transport request 'TR3401' (id: 13) with status 'Success', at Jul-22-2019 12:30:16 GMT",
 *           "createdAt": "2019-07-22T12:30:16.400Z"
 *         },
 *         {
 *           "id": 41,
 *           "messageId": "DEPLOYMENT_STARTED",
 *           "severity": "I",
 *           "message": "Deployment started. Process ID: dc93855f-53dd-4df5-8083-4c43db6a98e4",
 *           "createdAt": "2019-07-22T12:30:10.760Z"
 *         }
 *       ],
 *       "entities": [
 *         {
 *           "id": 14,
 *           "uri": "9",
 *           "status": "succeeded",
 *           "fileName": "small_com.sap.sl.ts.demo.ypa.mtar",
 *           "messages": [
 *             {
 *               "id": 52,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference 3277104e-70c4-4742-80b1-209f1d553f18 finished successfully",
 *               "createdAt": "2019-07-22T12:30:14.748Z"
 *             },
 *             {
 *               "id": 51,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of file aca6420c-1aaf-4c94-a543-64ca3bbe8576 finished successfully",
 *               "createdAt": "2019-07-22T12:30:14.748Z"
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export type TrLogsResponse2 = {
  logs?: TrLogResponse2[];
} & Record<string, any>;
