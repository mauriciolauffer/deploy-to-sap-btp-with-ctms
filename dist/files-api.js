"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesApi = void 0;
/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const openapi_1 = require("@sap-cloud-sdk/openapi");
/**
 * Representation of the 'FilesApi'.
 * This API is part of the 'TMS_v2' service.
 */
exports.FilesApi = {
    _defaultBasePath: undefined,
    /**
     * Uploads a file (application or content archive) to Cloud Transport Management and returns a file ID. You can reference the file ID in Node Export and Node Upload requests.
     *
     * @param body - Request body.
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    fileUploadV2: (body) => new openapi_1.OpenApiRequestBuilder('post', '/files/upload', {
        body
    }, exports.FilesApi._defaultBasePath),
    /**
     * Deletes a file (application or content archive) that was uploaded to Cloud Transport Management but is not related to a Transport Request.
     * @param fileId - File ID as returned by POST /files/upload
     * @returns The request builder, use the `execute()` method to trigger the request.
     */
    fileDelete: (fileId) => new openapi_1.OpenApiRequestBuilder('delete', '/files/{fileId}', {
        pathParameters: { fileId }
    }, exports.FilesApi._defaultBasePath)
};
//# sourceMappingURL=files-api.js.map