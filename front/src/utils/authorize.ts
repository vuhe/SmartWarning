/**
 * 获取Token
 */
export function getToken(): string {
  return localStorage.getItem('token') || '';
}

// 设置Token
export function setToken(token: any): void {
  localStorage.setItem('token', token);
}

/**
 * 获取本地token判断是否登录
 */
export function isLogined(): boolean {
  if (localStorage.getItem('token') !== '') {
    return true;
  }
  return false;
}
