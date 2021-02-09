import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import './App.scss';
import { indexRoutes } from './router/routers';
import NavigationBar from './components/NavigationBar';
import Global from './pages/index/global/Global';
import Statistic from './pages/index/statistic/Statistic';
import { isLogined } from './utils/authorize';

const { Content } = Layout;

class App extends React.Component<any, any> {
  render() {
    return (
      <>
        {isLogined() ? (
          <Layout style={{ minHeight: '100vh' }}>
            <NavigationBar />
            <Content style={{ margin: '16px 12px 0' }}>
              {/* <div style={{ padding: 24, background: '#fff' }}>{this.props.children}</div> */}
              <Switch>
                <Route
                  path="/index/global"
                  render={(routeProps: any) => {
                    return <Global {...routeProps} />;
                  }}
                />
                <Route
                  path="/index/statistic"
                  render={(routeProps: any) => {
                    return <Statistic {...routeProps} />;
                  }}
                />
                {indexRoutes.map((route) => {
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
              {/* </BasicLayout> */}
            </Content>
          </Layout>
        ) : (
          <Redirect to="/login" />
        )}
      </>
    );
  }
}

export default hot(App);
