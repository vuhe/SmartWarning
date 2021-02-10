import React from 'react';
import { Layout } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const { Content } = Layout;
// const routes = indexRoutes.filter((route) => route.isShow);

export interface BasicLayoutProps extends RouteComponentProps {}

class BasicLayout extends React.Component<BasicLayoutProps, any> {
  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Content style={{ margin: '0 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
