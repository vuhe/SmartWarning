import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MoreLayout from './MoreLayout';

/**
 * /index/more 的路由处理
 */
export default React.memo(function MoreRoute(props: any) {
  const { routes } = props;
  const showRoutes = (routes as SmartWarning.routeType[]).filter((route) => route.isShow);
  console.log(showRoutes);

  return (
    <MoreLayout>
      <Switch>
        {showRoutes.map((route: any) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={(routeProps: any) => {
                return <route.component {...routeProps} />;
              }}
            />
          );
        })}
        <Redirect to="/404" />
      </Switch>
    </MoreLayout>
  );
});
