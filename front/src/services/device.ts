import { get } from '../utils/request';

/**
 * 根据设备ID获取设备信息
 * @param {number} id 设备ID
 */
export function getDeviceInfoByIdApi(id: number): Promise<any> {
  return get('/api/device_info/get', id);
}
