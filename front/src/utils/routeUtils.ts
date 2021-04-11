/**
 * 在指定的路由对象数组中寻找指定的路由对象
 * @param {any[]} routes 路由对象数组
 * @param {string} pathname 要寻找的路由对象的路径
 * @returns {any} 返回寻找的路由对象
 */
export default function getRoute(routes: any[], pathname: string): any {
  for (const route of routes) {
    if (route.path === pathname) {
      return route;
    } else if (route.hasOwnProperty('children')) {
      return getRoute(route.children, pathname);
    }
  }
}
