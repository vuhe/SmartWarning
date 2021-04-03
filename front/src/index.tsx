import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.scss';
import { routes, routeType } from './router/routers';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';

ReactDOM.render(
  <ConfigProvider>
    <Router>
      <Switch>
        {routes.map((route: routeType, index: number) => {
          return <RouteWithSubRoutes key={index} {...route} />;
        })}
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.querySelector('#root'),
);
