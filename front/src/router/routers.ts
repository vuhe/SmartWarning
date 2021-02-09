import { UserOutlined } from '@ant-design/icons';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import GlobalIndexPage from '../pages/index/global/GlobalIndexPage';
import User from '../pages/index/user/User';

export interface routeType {
  path: string;
  component: React.Component<any, any>;
  exact?: boolean;
  icon?: any;
  title?: string;
  isShow?: string;
}

/**
 * 主要路由配置
 */
export const mainRoutes: any[] = [
  {
    path: '/',
    component: Login,
    exact: true,
    title: '/',
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    title: '登录',
  },
  {
    path: '/404',
    component: PageNotFound,
    title: '404',
  },
];

export const indexRoutes: any[] = [
  {
    path: '/index',
    component: User,
    exact: true,
    isShow: true,
    title: '主页',
  },
  {
    path: '/index/statistic',
    component: User,
    exact: true,
    isShow: true,
    title: '统计数据',
  },
];

/**
 * 首页页面路由
 */
export const globalRoutes: any[] = [
  {
    path: '/index/global',
    component: GlobalIndexPage,
    exact: true,
    icon: UserOutlined,
    isShow: true,
    title: 'GlobalIndexPages',
  },
];

/**
 * 统计数据页面路由
 */
export const statisticRoutes: any[] = [
  {
    path: '/index/statistic',
    component: User,
    exact: true,
    icon: UserOutlined,
    isShow: true,
    title: '图表',
  },
  {
    path: '/index/statistic/charts',
    component: User,
    exact: true,
    icon: UserOutlined,
    isShow: true,
    title: '图表',
  },
];
