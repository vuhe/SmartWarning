import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import Charts from '../pages/index/statistic/charts/Charts';
import Statistic from '../pages/index/statistic/Statistic';
import Global from '../pages/index/global/Global';
import App from '../App';
import MoreRoute from '../pages/index/more/MoreRoute';
import Log from '../pages/index/more/log/Log';
import Schedule from '../pages/index/more/schedule/Schedule';
import Risk from '../pages/index/more/risk/Risk';
import Equipment from '../pages/index/more/equipment/Equipment';
import EquipSafety from '@/pages/index/equipSafety/EquipSafety';
import User from '@/pages/index/usermanage/User';
import UserLog from '@/pages/index/log/userLog/UserLog';

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

// 模拟电表路由
export const metersRoutes: routeType[] = [
  {
    path: '/index/statistic/charts/10',
    exact: true,
    component: Charts,
    title: '#电表10',
    isShow: true,
  },
  {
    path: '/index/statistic/charts/11',
    exact: true,
    component: Charts,
    title: '#电表11',
    isShow: true,
  },
  {
    path: '/index/statistic/charts/12',
    exact: true,
    component: Charts,
    title: '#电表12',
    isShow: true,
  },
  {
    path: '/index/statistic/charts/13',
    exact: true,
    component: Charts,
    title: '#电表13',
    isShow: true,
  },
  {
    path: '/index/statistic/charts/14',
    exact: true,
    component: Charts,
    title: '#电表14',
    isShow: true,
  },
];

/**
 * 所有页面嵌套路由
 */
export const routes: routeType[] = [
  {
    path: '/',
    component: Login,
    exact: true,
    title: '登录',
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    title: '登录',
  },
  {
    path: '/index',
    component: App,
    exact: false,
    title: '首页',
    children: [
      {
        path: '/index',
        exact: true,
        component: Global,
        title: '首页',
      },
      {
        path: '/index/global',
        exact: true,
        component: Global,
        title: '首页',
      },
      { path: '/index/equip_safety', exact: true, component: EquipSafety, title: '首页' },
      {
        path: '/index/more',
        exact: false,
        component: MoreRoute,
        title: '更多',
        children: [
          { path: '/index/more/risk', exact: true, component: Risk, title: '今日风险图' },
          { path: '/index/more/schedule', exact: true, component: Schedule, title: '待办事项' },
          { path: '/index/more/equipment', exact: true, component: Equipment, title: '设备信息' },
          { path: '/index/more/log', exact: true, component: Log, title: '日志记录' },
        ],
      },
      {
        path: '/index/statistic',
        exact: false,
        component: Statistic,
        title: '数据页面',
        children: [
          {
            path: '/index/statistic',
            exact: true,
            component: Charts,
            title: '数据页面',
            isShow: false,
          },
          {
            path: '/index/statistic/all',
            exact: true,
            component: Charts,
            title: '总电表数据',
            isShow: false,
          },
          {
            path: '/index/statistic/charts/15/1',
            exact: true,
            component: Charts,
            title: '#电表一',
            isShow: true,
          },
          {
            path: '/index/statistic/charts/15/2',
            exact: true,
            component: Charts,
            title: '#电表二',
            isShow: true,
          },
          ...metersRoutes,
        ],
      },
      { path: '/index/user', exact: true, component: User, title: '用户' },
      { path: '/index/userLog', exact: true, component: UserLog, title: '用户操作日志' },
    ],
  },
  {
    path: '/404',
    component: PageNotFound,
    exact: false,
    title: '404',
  },
];
