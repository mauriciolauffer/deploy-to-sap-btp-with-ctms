/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { TransportRequestResponse2 } from './transport-request-response-2';
/**
 * Representation of the 'TransportRequestsResponse2' schema.
 */
export type TransportRequestsResponse2 = {
  /**
   * @example {
   *   "transportRequests": [
   *     {
   *       "id": 30,
   *       "status": "succeeded",
   *       "archived": false,
   *       "position": 1,
   *       "createdAt": "2019-07-25T08:31:10.464Z",
   *       "queuedAt": "2019-07-25T09:10:00.123Z",
   *       "createdBy": "d7ad0010-09a7-4916-be8d-1166c653e0c7",
   *       "createdByNamedUser": "d012345",
   *       "description": "TR3501",
   *       "origin": "SRC_NODE_350",
   *       "entries": [
   *         {
   *           "id": 31,
   *           "storageType": "FILE",
   *           "contentType": "APP",
   *           "uri": "10"
   *         },
   *         {
   *           "id": 32,
   *           "storageType": "FILE",
   *           "contentType": "APP",
   *           "uri": "15"
   *         }
   *       ]
   *     },
   *     {
   *       "id": 37,
   *       "status": "succeeded",
   *       "archived": false,
   *       "position": 2,
   *       "createdAt": "2019-07-25T08:30:10.164Z",
   *       "queuedAt": "2019-07-25T09:00:00.123Z",
   *       "createdBy": "d7ad0010-09a7-4916-be8d-1166c653e0c7",
   *       "createdByNamedUser": "d012345",
   *       "description": "TR3502",
   *       "origin": "SRC_NODE_350",
   *       "entries": [
   *         {
   *           "id": 39,
   *           "storageType": "FILE",
   *           "contentType": "APP",
   *           "uri": "25"
   *         },
   *         {
   *           "id": 38,
   *           "storageType": "FILE",
   *           "contentType": "APP",
   *           "uri": "20"
   *         }
   *       ]
   *     }
   *   ]
   * }
   */
  transportRequests?: TransportRequestResponse2[];
} & Record<string, any>;
