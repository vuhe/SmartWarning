import React from 'react';
import { Layout, Menu, Anchor } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { CreditCardOutlined } from '@ant-design/icons';
import { metersRoutes } from '@/router/routers';
import SWFooter from '@/components/SWFooter';

const { Sider, Content } = Layout;

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
          <Anchor>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['tables']} inlineCollapsed>
              <Menu.Item key="tables">
                <Link to="/index/statistic/all">
                  <span>总数据</span>
                </Link>
              </Menu.Item>
              <Menu.SubMenu
                key="index"
                title={
                  <span>
                    <CreditCardOutlined />
                    <span>#15号宿舍楼</span>
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

              <Menu.SubMenu
                key="#14"
                title={
                  <span>
                    <CreditCardOutlined />
                    <span>#14号宿舍楼</span>
                  </span>
                }
              >
                {metersRoutes.map((route: any) => {
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
          </Anchor>
        </Sider>
        <Layout>
          <Content style={{ margin: '4px 8px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <SWFooter />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(StatisticLayout);
