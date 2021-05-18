import Charts from '@/pages/index/statistic/charts/Charts';

/**
 * 在指定的路由对象数组中寻找指定的路由对象
 * @param {SmartWarning.routeType[]} routes 路由对象数组
 * @param {string} pathname 要寻找的路由对象的路径
 * @returns {SmartWarning.routeType | undefined} 返回寻找的路由对象,未找到则返回 undefined
 */
export default function getRoute(
  routes: SmartWarning.routeType[] | undefined,
  pathname: string,
): SmartWarning.routeType | undefined {
  if (typeof routes === 'undefined') {
    return;
  }
  for (const route of routes) {
    if (route.path === pathname) {
      return route;
    } else if (Object.prototype.hasOwnProperty.call(route, 'children')) {
      /**
       * <a>http://eslint.cn/docs/rules/no-prototype-builtins</a>
       * 配置文件中的 "extends": "eslint:recommended" 属性启用了此规则。
       * 在ECMAScript 5.1中，新增了 Object.create，它支持使用指定的 [[Prototype]] 创建对象。
       * Object.create(null) 是一种常见的模式，用于创建将用作映射的对象。
       * 当假定对象将包含来自Object.prototype 的属性时，这可能会导致错误。
       * 该规则防止直接从一个对象调用某些 Object.prototype 的方法。此外，对象可以具有属性，
       * 这些属性可以将 Object.prototype 的内建函数隐藏，可能导致意外行为或拒绝服务安全漏洞。
       * 例如，web 服务器解析来自客户机的 JSON 输入并直接在结果对象上调用 hasOwnProperty
       * 是不安全的，因为恶意客户机可能发送一个JSON值，如 {"hasOwnProperty": 1}，并导致服务器崩溃。
       * 为了避免这种细微的 bug，最好总是从 Object.prototype 调用这些方法。
       * 例如，foo.hasOwnProperty("bar") 应该替换为 `Object.prototype.hasOwnProperty.call(foo, "bar")`
       */
      return getRoute(route.children, pathname);
    }
  }
  return undefined;
}

/**
 * 传入的每一台设备都对应一个路由返回
 * @param drives 设备数组
 * @returns 路由数组
 */
export function getDriveRoutes(drives: SmartWarning.Drive[]): SmartWarning.routeType[] {
  return drives.map((drive) => {
    return {
      path: `/index/statistic/charts/${drive.driveName}`,
      title: drive.driveName,
      exact: true,
      component: Charts,
    };
  }) as SmartWarning.routeType[];
}
