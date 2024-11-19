/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ActionStatus } from './action-status';
import type { ActionTREntityStatusResponse2 } from './action-tr-entity-status-response-2';
/**
 * Representation of the 'ActionTRStatusResponse2' schema.
 */
export type ActionTRStatusResponse2 = {
  /**
   * Format: "int64".
   */
  id?: number;
  status?: ActionStatus;
  entities?: ActionTREntityStatusResponse2[];
} & Record<string, any>;
