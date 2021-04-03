import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MoreLayout from './MoreLayout';

/**
 * /index/more 的路由处理
 */
export default React.memo(function MoreRoute(props: any) {
  const { routes } = props;
  return (
    <MoreLayout>
      <Switch>
        {routes.map((route: any) => {
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
