import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.scss';
import App from './App';
import { mainRoutes } from './router/routers';

ReactDOM.render(
  <Router>
    <Switch>
      <Route
        path="/index"
        render={(routeProps: any) => {
          return <App {...routeProps} />;
        }}
      />
      {mainRoutes.map((route: any) => {
        return <Route key={route.path} {...route} />;
      })}
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.querySelector('#root'),
);
