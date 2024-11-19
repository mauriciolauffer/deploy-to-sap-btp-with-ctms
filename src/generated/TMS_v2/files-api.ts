/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { FileInfo } from './schema';
/**
 * Representation of the 'FilesApi'.
 * This API is part of the 'TMS_v2' service.
 */
export const FilesApi = {
  /**
   * Uploads a file (application or content archive) to Cloud Transport Management and returns a file ID. You can reference the file ID in Node Export and Node Upload requests.
   *
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  fileUploadV2: (body: any) =>
    new OpenApiRequestBuilder<FileInfo | any>('post', '/files/upload', {
      body
    }),
  /**
   * Deletes a file (application or content archive) that was uploaded to Cloud Transport Management but is not related to a Transport Request.
   * @param fileId - File ID as returned by POST /files/upload
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  fileDelete: (fileId: string) =>
    new OpenApiRequestBuilder<any>('delete', '/files/{fileId}', {
      pathParameters: { fileId }
    })
};
