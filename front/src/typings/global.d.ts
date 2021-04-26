declare namespace SmartWarning {
  /**
   * 路由类型
   * path {string} 路由
   * component {any} 加载组件
   * exact {boolean} 是否精准匹配
   * icon? {any} 图标
   * title? {string} 标题
   * isShow? {boolean} 是否注册此路由
   * isDisable? {boolean} 是否展示该路由为不可选
   * children? {routeType[]} 子路由
   */
  export interface routeType {
    path: string;
    component: any;
    exact: boolean;
    icon?: any;
    title?: string;
    isShow?: boolean;
    isDisable?: boolean;
    children?: routeType[];
  }

  /**
   * 电表数据项类型
   * time {string} 时间
   * channelName {string} 数据项名称
   * value {number} 数据值
   * perUnit {string} 数据单位
   * statusName {string} 状态名称
   * statusColor {string} 状态颜色
   */
  export interface meterEntry {
    time: string;
    channelName: string;
    value: number;
    perUnit?: string;
    statusName?: string;
    statusColor?: string;
  }
}
