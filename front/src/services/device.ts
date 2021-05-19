import { get, put } from '../utils/request';

/**
 * [GET] 根据设备 ID 获取该设备的所有实时数据（包括今天的过去信息）
 * @param {number} id 设备ID
 * @returns {Promise<any>}
 */
export function getDriveRealtimeDataById(driveId: number): Promise<any> {
  return get(`/realtime/getAll`, { driveId });
}

/**
 * [GET] 获取设备信息
 * @returns {Promise<any>}
 */
export function getDriveInfo(): Promise<any> {
  return get(`/drive/getInfo`);
}

/**
 * [GET] 获取所有设备的风险信息
 * @returns {Promise<any>}
 */
export function getDriveRiskFactor(): Promise<any> {
  return get(`/drive/getRiskFactor`);
}

/**
 * [GET] 获取设备日志
 * @returns {Promise<any>}
 */
export function getDriveLog(): Promise<any> {
  return get(`/log/driveLog`);
}

/**
 * [GET] 获取设备日志信息
 * @returns {Promise<any>}
 */
export function getDriveLogsInfo(): Promise<any> {
  return get(`/log/driveInfo`);
}

/**
 * [PUT] 根据设备 ID 解决日志
 * @param id 设备ID
 * @returns {Promise<any>}
 */
export function handleDriveLogByID(id: number): Promise<any> {
  return put(`/log/handleDriveLog`, id);
}
