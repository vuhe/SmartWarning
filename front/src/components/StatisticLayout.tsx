import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Html5TwoTone, CreditCardOutlined } from '@ant-design/icons';
import { statisticRoutes as routes } from '../router/routers';

const { Footer, Sider, Content } = Layout;
// const routes = indexRoutes.filter((route) => route.isShow);

export interface StatisticLayoutProps extends RouteComponentProps {}

class StatisticLayout extends React.Component<any, any> {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Sider width={168} theme="light" style={{ minHeight: '90vh' }}>
          <div
            style={{
              height: '32px',
              background: '#fff',
              margin: '16px',
            }}
          >
            <span>智慧火灾预警系统</span>
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Html5TwoTone />
              <span>Hello World</span>
            </Menu.Item>
            <Menu.SubMenu
              key="index"
              title={
                <span>
                  <CreditCardOutlined />
                  <span>统计数据</span>
                </span>
              }
            >
              {routes.map((route) => {
                return (
                  <Menu.Item key={route.path}>
                    <Link to={route.path}>
                      {route.icon ? <route.icon /> : null}
                      <span>{route.title}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>华北水利水电大学</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(StatisticLayout);
