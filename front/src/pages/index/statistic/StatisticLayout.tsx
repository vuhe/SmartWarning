import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { CreditCardOutlined, Html5TwoTone } from '@ant-design/icons';

const { Footer, Sider, Content } = Layout;

export interface StatisticLayoutProps extends RouteComponentProps {}

/**
 * 数据页面的基础布局
 */
class StatisticLayout extends React.Component<any, any> {
  render() {
    const { children, routes } = this.props;
    return (
      <Layout>
        <Sider width={144} theme="light" style={{ minHeight: '92vh' }}>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['tables']}>
            <Menu.Item key="tables">
              <Link to="/index/statistic/all">
                <Html5TwoTone />
                <span>电表</span>
              </Link>
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
              {routes.map((route: any) => {
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
          <Content style={{ margin: '4px 8px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>华北水利水电大学</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(StatisticLayout);
