import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import './App.scss';
import NavigationBar from './components/NavigationBar';
import { isLogined } from './utils/localStorage';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';

const { Content } = Layout;

/**
 * index页面
 */
class App extends React.Component<any, any> {
  render() {
    const { routes } = this.props;
    return (
      <>
        {
          /** 判断登录后则渲染组件否则将重定向到 /login */
          isLogined() ? (
            <Layout style={{ minHeight: '100vh' }}>
              <NavigationBar routes={routes} />
              <Content style={{ margin: '1px 4px 0px' }}>
                <Switch>
                  {routes.map(function (route: any) {
                    return <RouteWithSubRoutes key={route.path} {...route} />;
                  })}
                  <Redirect to="/404" />
                </Switch>
              </Content>
            </Layout>
          ) : (
            <Redirect to="/login" />
          )
        }
      </>
    );
  }
}

export default hot(App);
