import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { statisticRoutes } from '../../../router/routers';
import StatisticLayout from '../../../components/StatisticLayout';

class Statistic extends React.Component<any, any> {
  render() {
    return (
      <>
        <StatisticLayout>
          <Switch>
            {statisticRoutes.map((route) => {
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
        </StatisticLayout>
      </>
    );
  }
}

export default Statistic;
