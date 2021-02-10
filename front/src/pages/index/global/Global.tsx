import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { globalRoutes } from '../../../router/routers';
import GlobalLayout from '../../../components/GlobalLayout';

class Global extends React.Component<any, any> {
  render() {
    return (
      <>
        <GlobalLayout>
          <Switch>
            {globalRoutes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={(routeProps) => {
                    return <route.component {...routeProps} />;
                  }}
                />
              );
            })}
            <Redirect to="/404" />
          </Switch>
        </GlobalLayout>
      </>
    );
  }
}

export default Global;
