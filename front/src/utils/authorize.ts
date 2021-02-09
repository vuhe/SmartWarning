export function getToken(): string {
  return localStorage.getItem('token') || '';
}

export function setToken(token: any): void {
  localStorage.setItem('token', token);
}

export function isLogined(): boolean {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
}
