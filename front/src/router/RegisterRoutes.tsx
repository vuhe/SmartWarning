import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// 注册路由组件
export default function RegisterRoutes(routes: SmartWarning.routeType[]) {
  const showRoutes = routes.filter((item) => item.isShow);
  // console.log('RouteWithSubRoutes: ' + route.path);
  return (
    <Switch>
      {showRoutes.map((route: SmartWarning.routeType) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            render={(routeProps: any) => <route.component {...routeProps} />}
          />
        );
      })}
      <Redirect to="/404" />
    </Switch>
  );
}
