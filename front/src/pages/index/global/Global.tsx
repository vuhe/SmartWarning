import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalLayout from './GlobalLayout';
import GlobalIndexPage from './GlobalIndexPage';
// import RouteWithSubRoutes from '../../../router/RouteWithSubRoutes';

/**
 * 首页的路由处理
 */
class Global extends React.Component<any, any> {
  render() {
    return (
      <>
        <GlobalLayout>
          <Switch>
            <Route path="/index" exact component={GlobalIndexPage} />
            <Route path="/index/global" exact component={GlobalIndexPage} />
            <Redirect to="/404" />
          </Switch>
        </GlobalLayout>
      </>
    );
  }
}

export default Global;
