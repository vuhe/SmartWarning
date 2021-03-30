import { get } from '../utils/request';

/**
 * 用户登录
 * @param user {{ username: string; password: string }}
 */
export function loginApi(user: { username: string; password: string }): Promise<any> {
  return get('/api/login', user);
}
