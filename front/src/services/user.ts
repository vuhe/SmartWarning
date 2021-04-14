import { get, post, BASE_URL_1 } from '../utils/request';

/**
 * 获得所有用户列表
 * @returns {Promise<any>}
 */
export function getAllUserList(): Promise<any> {
  return get(`${BASE_URL_1}/api/user/getList`);
}

/**
 * 添加一名用户
 * @param user {{ username: string; password: string }}
 * @returns {Promise<any>}
 */
export function addUser(user: { username: string; password: string; role: string }): Promise<any> {
  return post(`${BASE_URL_1}/api/user/add`, user);
}

/**
 * 获得所有用户操作日志
 * @returns {Promise<any>}
 */
export function getUserLogs(): Promise<any> {
  return get(`${BASE_URL_1}/api/log/userLog`);
}
