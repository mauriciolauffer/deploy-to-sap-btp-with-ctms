/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { TransportActionType } from './transport-action-type.js';
import type { LogEntityResponse2 } from './log-entity-response-2.js';
import type { LogMessageResponse2 } from './log-message-response-2.js';
import type { ActionStatus } from './action-status.js';
/**
 * Representation of the 'TrLogResponse2' schema.
 */
export type TrLogResponse2 = {
  /**
   * Format: "int64".
   */
  actionId?: number;
  /**
   * Format: "date-time".
   */
  actionStartedAt?: string;
  actionTriggeredBy?: string;
  actionTriggeredByNamedUser?: string;
  actionType?: TransportActionType;
  entities?: LogEntityResponse2[];
  messages?: LogMessageResponse2[];
  status?: ActionStatus;
} & Record<string, any>;
