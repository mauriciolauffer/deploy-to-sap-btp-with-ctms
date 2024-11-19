import type { LogResponse2 } from './log-response-2';
/**
 * Representation of the 'LogsResponse2' schema.
 * @example {
 *   "logs": [
 *     {
 *       "transportRequestId": 30,
 *       "status": "succeeded",
 *       "messages": [
 *         {
 *           "id": 82,
 *           "messageId": "TRANSPORTREQUEST_END",
 *           "severity": "I",
 *           "message": "Import ended for transport request 'TR3501' (id: 30) with status 'Success', at May-07-2019 06:40:54 GMT",
 *           "createdAt": "2019-05-07T06:40:54.0958+0000"
 *         },
 *         {
 *           "id": 46,
 *           "messageId": "TRANSPORTREQUEST_START",
 *           "severity": "I",
 *           "message": "Import (selected) started for transport request 'TR3501' (id: 30), at May-07-2019 06:40:48 GMT",
 *           "createdAt": "2019-05-07T06:40:48.0752+0000"
 *         }
 *       ],
 *       "entities": [
 *         {
 *           "id": 32,
 *           "uri": "15",
 *           "fileName": "file1.zip",
 *           "status": "succeeded",
 *           "messages": [
 *             {
 *               "id": 77,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference 982f7a9a-e9d3-411a-888d-da347c8f02f1 finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0371+0000"
 *             },
 *             {
 *               "id": 74,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference 63103e7f-11de-4b39-bdd2-e429f3f24549 finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0370+0000"
 *             }
 *           ]
 *         },
 *         {
 *           "id": 31,
 *           "uri": "10",
 *           "fileName": "file2.zip",
 *           "status": "succeeded",
 *           "messages": [
 *             {
 *               "id": 77,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference 982f7a9a-e9d3-411a-888d-da347c8f02f1 finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0371+0000"
 *             },
 *             {
 *               "id": 74,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference 63103e7f-11de-4b39-bdd2-e429f3f24549 finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0370+0000"
 *             }
 *           ]
 *         }
 *       ]
 *     },
 *     {
 *       "transportRequestId": 37,
 *       "status": "succeeded",
 *       "messages": [
 *         {
 *           "id": 81,
 *           "messageId": "TRANSPORTREQUEST_END",
 *           "severity": "I",
 *           "message": "Import ended for transport request 'TR3502' (id: 37) with status 'Success', at May-07-2019 06:40:54 GMT",
 *           "createdAt": "2019-05-07T06:40:54.0954+0000"
 *         },
 *         {
 *           "id": 47,
 *           "messageId": "TRANSPORTREQUEST_START",
 *           "severity": "I",
 *           "message": "Import (selected) started for transport request 'TR3502' (id: 37), at May-07-2019 06:40:48 GMT",
 *           "createdAt": "2019-05-07T06:40:48.0758+0000"
 *         }
 *       ],
 *       "entities": [
 *         {
 *           "id": 38,
 *           "uri": "20",
 *           "fileName": "file3.zip",
 *           "status": "succeeded",
 *           "messages": [
 *             {
 *               "id": 80,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference c952da44-3f83-49a3-8e0d-ff9fff0a110b finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0372+0000"
 *             },
 *             {
 *               "id": 71,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference 9ea0e65e-2e51-4e54-aa45-e87444467fdc finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0370+0000"
 *             }
 *           ]
 *         },
 *         {
 *           "id": 39,
 *           "uri": "25",
 *           "fileName": "file4.zip",
 *           "status": "succeeded",
 *           "messages": [
 *             {
 *               "id": 80,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference c952da44-3f83-49a3-8e0d-ff9fff0a110b finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0372+0000"
 *             },
 *             {
 *               "id": 71,
 *               "messageId": " ",
 *               "severity": "I",
 *               "message": "Deploy of content reference 9ea0e65e-2e51-4e54-aa45-e87444467fdc finished successfully",
 *               "createdAt": "2019-05-07T06:40:53.0370+0000"
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
export type LogsResponse2 = {
    logs?: LogResponse2[];
} & Record<string, any>;
