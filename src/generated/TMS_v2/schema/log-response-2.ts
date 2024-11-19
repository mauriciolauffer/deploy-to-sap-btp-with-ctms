/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ActionStatus } from './action-status';
import type { LogMessageResponse2 } from './log-message-response-2';
import type { LogEntityResponse2 } from './log-entity-response-2';
/**
 * Representation of the 'LogResponse2' schema.
 */
export type LogResponse2 = {
  /**
   * Format: "int64".
   */
  transportRequestId?: number;
  status?: ActionStatus;
  messages?: LogMessageResponse2[];
  entities?: LogEntityResponse2[];
} & Record<string, any>;
