import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'FilesApi'.
 * This API is part of the 'TMS_v2' service.
 */
export declare const FilesApi: {
    _defaultBasePath: undefined;
    /**
     * Uploads a file (application or content archive) to Cloud Transport Management and returns a file ID. You can reference the file ID in Node Export and Node Upload requests.
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    fileUploadV2: (body: any) => OpenApiRequestBuilder<any>;
    /**
     * Deletes a file (application or content archive) that was uploaded to Cloud Transport Management but is not related to a Transport Request.
     * @param fileId - File ID as returned by POST /files/upload
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    fileDelete: (fileId: string) => OpenApiRequestBuilder<any>;
};
