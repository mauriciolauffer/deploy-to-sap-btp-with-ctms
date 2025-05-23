/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ActionStatus } from './action-status.js';
/**
 * Representation of the 'ActionTREntityStatusResponse2' schema.
 */
export type ActionTREntityStatusResponse2 = {
  /**
   * Format: "int64".
   */
  id?: number;
  uri?: string;
  fileName?: string;
  status?: ActionStatus;
} & Record<string, any>;
