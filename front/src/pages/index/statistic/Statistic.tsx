import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import store from '@/redux/store';
import StatisticLayout from './StatisticLayout';
import { getDriveRoutes } from '@/utils/routeUtils';
// import RouteWithSubRoutes from '../../../router/RouteWithSubRoutes';

/**
 * 数据页面的路由处理
 */
class Statistic extends React.Component<any, any> {
  state: any = { drives: [] };
  constructor(props: any) {
    super(props);
    this.state.drives = (store.getState() as any).drives;
  }

  render() {
    const { routes } = this.props;
    const showRoutes = routes.filter((route: any) => route.isShow);
    // console.log(showRoutes);
    return (
      <>
        <StatisticLayout routes={showRoutes}>
          <Switch>
            {routes.map((route: any) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={(routeProps: any) => {
                    return <route.component {...routeProps} title={route.title} />;
                  }}
                />
              );
            })}
            {
              // 将请求到的每个设备都注册一个路由
              getDriveRoutes(this.state.drives).map((route: SmartWarning.routeType) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    render={(routeProps: any) => {
                      return <route.component {...routeProps} id={route.id} title={route.title} />;
                    }}
                  />
                );
              })
            }
            <Redirect to="/404" />
          </Switch>
        </StatisticLayout>
      </>
    );
  }
}

export default Statistic;
