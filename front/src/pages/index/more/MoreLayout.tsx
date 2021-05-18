import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import SWFooter from '@/components/SWFooter';

const { Content } = Layout;

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
          <div style={{ padding: 12, background: '#fff', minHeight: 370 }}>{children}</div>
        </Content>
        <SWFooter />
      </Layout>
    </>
  );
};

export default withRouter(MoreLayout);
