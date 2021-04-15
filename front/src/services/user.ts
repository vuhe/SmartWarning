import { get, post, put, deleteRequest, BASE_URL_1 } from '../utils/request';

// 用户类型
type User = {
  username: string;
  password: string;
  role: string;
};

/**
 * 获得所有用户列表
 * @returns {Promise<any>}
 */
export function getAllUserList(): Promise<any> {
  return get(`${BASE_URL_1}/api/user/getList`);
}

/**
 * 添加一名用户
 * @param user {User}
 * @returns {Promise<any>}
 */
export function addUser(user: User): Promise<any> {
  return post(`${BASE_URL_1}/api/user/add`, user);
}

/**
 * 修改一名用户
 * @param user
 * @returns {Promise<any>}
 */
export function modifyUser(user: User): Promise<any> {
  return put(`${BASE_URL_1}/api/user/modify`, user);
}

/**
 * 删除一个用户
 * @param user 要删除的用户信息
 * @returns {Promise<any>}
 */
export function deleteUser(user: User): Promise<any> {
  return deleteRequest(`${BASE_URL_1}/api/user/delete`, user);
}

/**
 * 获得所有用户操作日志
 * @returns {Promise<any>}
 */
export function getUserLogs(): Promise<any> {
  return get(`${BASE_URL_1}/api/log/userLog`);
}
