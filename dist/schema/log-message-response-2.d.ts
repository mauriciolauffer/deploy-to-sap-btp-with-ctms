/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { LogSeverity } from './log-severity.js';
/**
 * Representation of the 'LogMessageResponse2' schema.
 */
export type LogMessageResponse2 = {
  /**
   * Format: "int64".
   */
  id?: number;
  messageId?: string;
  severity?: LogSeverity;
  message?: string;
  /**
   * Format: "date-time".
   */
  createdAt?: string;
} & Record<string, any>;
