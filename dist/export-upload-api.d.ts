/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { NodeExportBodyEntityName, ExportEntity } from './schema/index.js';
/**
 * Representation of the 'ExportUploadApi'.
 * This API is part of the 'TMS_v2' service.
 */
export declare const ExportUploadApi: {
  _defaultBasePath: undefined;
  /**
   * Creates a transport request containing (multiple) file or application-specific references.  The export node is identified by its name. The transport request is added to the queues of the follow-on nodes of export node.
   * @param body - Request body
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeExportByNameV2: (
    body: NodeExportBodyEntityName
  ) => OpenApiRequestBuilder<ExportEntity>;
  /**
   * Creates a transport request with content specified by the File Upload operation or a by an application-specific reference.  The upload node is identified by its name. The transport request is added to the queue of the upload node.
   * @param body - Request body
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  nodeUploadByNameV2: (
    body: NodeExportBodyEntityName
  ) => OpenApiRequestBuilder<ExportEntity>;
};
