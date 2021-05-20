import {
  LineChartOutlined,
  OrderedListOutlined,
  ScheduleOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import Login from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
// import Charts from '../pages/index/statistic/charts/Charts';
import Statistic from '../pages/index/statistic/Statistic';
import Global from '../pages/index/global/Global';
import App from '../App';
import MoreRoute from '../pages/index/more/MoreRoute';
import DriveLog from '../pages/index/more/log/DriveLog';
import Schedule from '../pages/index/more/schedule/Schedule';
import Risk from '../pages/index/statistic/charts/risk/RiskChart';
import Equipment from '../pages/index/more/equipment/Equipment';
import EquipSafety from '../pages/index/equipSafety/EquipSafety';
import User from '../pages/index/usermanage/User';
import UserLog from '../pages/index/log/userLog/UserLog';
import TotalChartsPage from '@/pages/index/statistic/charts/TotalChartsPage';

/**
 * 所有页面的嵌套路由
 */
export const routes: SmartWarning.routeType[] = [
  {
    path: '/',
    component: Login,
    exact: true,
    title: '登录',
    isShow: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    title: '登录',
    isShow: true,
  },
  {
    path: '/index',
    component: App,
    exact: false,
    title: '首页',
    isShow: true,
    children: [
      {
        path: '/index',
        exact: true,
        component: Global,
        title: '首页',
        isShow: true,
      },
      {
        path: '/index/global',
        exact: true,
        component: Global,
        title: '首页',
        isShow: true,
      },
      {
        path: '/index/equip_safety',
        exact: true,
        component: EquipSafety,
        title: '首页',
        isShow: true,
      },

      {
        path: '/index/driveLog',
        exact: true,
        component: DriveLog,
        title: '首页',
        isShow: true,
      },
      {
        // 此路由废弃不进行注册 isShow: false,
        path: '/index/more',
        exact: false,
        component: MoreRoute,
        isShow: false,
        title: '更多',
        children: [
          {
            path: '/index/more/risk',
            exact: true,
            component: Risk,
            title: '今日风险图',
            icon: LineChartOutlined,
            isShow: true,
          },
          {
            path: '/index/more/schedule',
            exact: true,
            component: Schedule,
            title: '待办事项',
            icon: ScheduleOutlined,
            isShow: false,
          },
          {
            path: '/index/more/equipment',
            exact: true,
            component: Equipment,
            title: '设备信息',
            icon: PieChartOutlined,
            isShow: false,
          },
          {
            path: '/index/more/log',
            exact: true,
            component: DriveLog,
            title: '日志记录',
            isShow: true,
            icon: OrderedListOutlined,
          },
        ],
      },
      {
        path: '/index/statistic',
        exact: false,
        component: Statistic,
        title: '数据页面',
        isShow: true,
        children: [
          {
            path: '/index/statistic',
            exact: true,
            component: TotalChartsPage,
            title: '数据页面',
            isShow: false,
          },
          {
            path: '/index/statistic/all',
            exact: true,
            component: TotalChartsPage,
            title: '总电表数据',
            isShow: false,
          },
        ],
      },
      { path: '/index/user', exact: true, component: User, title: '用户', isShow: true },
      {
        path: '/index/userLog',
        exact: true,
        component: UserLog,
        title: '用户操作日志',
        isShow: true,
      },
    ],
  },
  {
    path: '/404',
    component: PageNotFound,
    exact: false,
    isShow: true,
    title: '404',
  },
];
