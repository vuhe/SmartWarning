import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StatisticLayout from './StatisticLayout';
// import RouteWithSubRoutes from '../../../router/RouteWithSubRoutes';

/**
 * 数据页面的路由处理
 */
class Statistic extends React.Component<any, any> {
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
            <Redirect to="/404" />
          </Switch>
        </StatisticLayout>
      </>
    );
  }
}

export default Statistic;
