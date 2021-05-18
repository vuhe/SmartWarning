import { get, post, put, deleteRequest } from '../utils/request';

// 用户类型
type User = {
  username: string;
  password: string;
  role: string;
};

/**
 * [GET] 获得所有用户列表
 * @returns {Promise<any>}
 */
export function getAllUserList(): Promise<any> {
  return get(`/user/getList`);
}

/**
 * [POST] 添加一名用户
 * @param user {User}
 * @returns {Promise<any>}
 */
export function addUser(user: User): Promise<any> {
  return post(`/user/add`, user);
}

/**
 * [PUT] 修改一名用户
 * @param user
 * @returns {Promise<any>}
 */
export function modifyUser(user: User): Promise<any> {
  return put(`/user/modify`, user);
}

/**
 * [DELETE] 删除一个用户
 * @param user 要删除的用户信息
 * @returns {Promise<any>}
 */
export function deleteUser(_username: string): Promise<any> {
  return deleteRequest(`/user/delete`, {
    username: _username,
    password: ' ',
    role: 'User',
  });
}

/**
 * [GET] 获得所有用户操作日志
 * @returns {Promise<any>}
 */
export function getUserLogs(): Promise<any> {
  return get(`/log/userLog`);
}
