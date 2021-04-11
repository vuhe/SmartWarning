declare namespace SmartWarning {
  /**
   * 路由类型
   * path {string} 路由
   * component {any} 加载组件
   * exact {boolean} 是否精准匹配
   * icon? {any} 图标
   * title? {string} 标题
   * isShow? {boolean} 是否展示
   * children? {routeType[]} 子路由
   */
  export interface routeType {
    path: string;
    component: any;
    exact: boolean;
    icon?: any;
    title?: string;
    isShow?: boolean;
    children?: routeType[];
  }
}
