import { post } from '../utils/request';

/**
 * [POST] 用户登录
 * @param user {{ username: string; password: string }}
 */
export function login(user: { username: string; password: string }): Promise<any> {
  return post(`/login`, user);
}
