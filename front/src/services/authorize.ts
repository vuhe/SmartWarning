import { post, BASE_URL_1 } from '../utils/request';

/**
 * 用户登录
 * @param user {{ username: string; password: string }}
 */
export function loginApi(user: { username: string; password: string }): Promise<any> {
  return post(`${BASE_URL_1}/api/login`, user);
}
