/**
 * 获取Token
 */
export function getToken(): string {
  return localStorage.getItem('token') || '';
}

// 设置Token
export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

/**
 * 获取本地token判断是否登录
 */
export function isLogined(): boolean {
  return localStorage.getItem('token') !== '';
}

// 从本地获取用户信息 userInfo
export function getUserInfo(): any {
  return JSON.parse(localStorage.getItem('userInfo') || '');
}

// 设置用户信息 userInfo
export function setUserInfo(user: any): void {
  localStorage.setItem('userInfo', JSON.stringify(user));
}

// 获取本地token判断是否登录
export function isAdmin(): boolean {
  return getUserInfo().username === 'admin';
}
