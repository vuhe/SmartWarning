import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './index.scss';
import { routes } from './router/routers';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';

ReactDOM.render(
  <ConfigProvider>
    <Router>
      <Switch>
        {routes.map((route: SmartWarning.routeType) => {
          return <RouteWithSubRoutes key={route.path} {...route} />;
        })}
        <Redirect to="/404" />
      </Switch>
    </Router>
  </ConfigProvider>,
  document.querySelector('#root'),
);
