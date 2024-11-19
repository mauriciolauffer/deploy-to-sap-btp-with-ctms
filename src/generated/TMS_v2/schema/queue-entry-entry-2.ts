/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { StorageType } from './storage-type';
import type { ContentType } from './content-type';
/**
 * Representation of the 'QueueEntryEntry2' schema.
 */
export type QueueEntryEntry2 = {
  /**
   * Format: "int64".
   */
  id?: number;
  storageType?: StorageType;
  contentType?: ContentType;
  uri?: string;
} & Record<string, any>;
