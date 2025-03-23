/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { PostContentRef } from './post-content-ref.js';
import type { ContentType } from './content-type.js';
import type { StorageType } from './storage-type.js';
/**
 * Node export request
 * @example {
 *   "nodeName": "DEV",
 *   "contentType": "MTA",
 *   "storageType": "FILE",
 *   "entries": [
 *     {
 *       "uri": "627"
 *     },
 *     {
 *       "uri": "628"
 *     }
 *   ],
 *   "description": "export/upload of 2 MTAs",
 *   "namedUser": "UserName"
 * }
 */
export type NodeExportBodyEntityName = {
  /**
   * Max Length: 512.
   */
  description: string;
  entries: PostContentRef[];
  /**
   * Max Length: 30.
   */
  nodeName: string;
  contentType: ContentType;
  storageType: StorageType;
  /**
   * User displayed in Cloud Transport Management UI. If not given the authentication user will be shown in Cloud Transport Management UI.
   * Max Length: 60.
   */
  namedUser?: string;
} & Record<string, any>;
