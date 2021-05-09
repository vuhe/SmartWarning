import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
// import { ConfigProvider } from 'antd';
import './index.scss';
import { routes } from './router/routers';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';
import store, { saveState } from './redux/store';

ReactDOM.render(
  <Router>
    <Switch>
      {routes.map((route: SmartWarning.routeType) => {
        return <RouteWithSubRoutes key={route.path} {...route} />;
      })}
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.querySelector('#root'),
);

// 添加事件在即将离开当前页面(刷新或关闭)时执行
window.addEventListener('beforeunload', () => {
  console.log('index: window.onbeforeunload');
  const state = store.getState();
  saveState(state);
});
