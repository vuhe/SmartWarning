import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

/**
 * /index/more 页面布局
 * @param props
 * @returns
 */
const MoreLayout = function (props: any) {
  const { children } = props;
  return (
    <>
      <Layout>
        <Content style={{ margin: '0 4px 0px 4px' }}>
          <div style={{ padding: 16, background: '#fff', minHeight: 370 }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>华北水利水电大学</Footer>
      </Layout>
    </>
  );
};

export default withRouter(MoreLayout);
