/**
 * Action type:
 *   * `FU` - File upload
 *   * `NE` - Node export
 *   * `NU` - Node upload
 *   * `I` - Import
 *   * `DQ` - Delete queue entry
 *   * `RQ` - Reset queue entry
 *   * `CQ` - Cleanup queue entry
 *   * `FQ` - Forward queue entry
 *   * `AQ` - Add queue entry
 *
 */
export type TransportActionType = 'FU' | 'NE' | 'NU' | 'I' | 'DQ' | 'RQ' | 'CQ' | 'FQ' | 'AQ';
