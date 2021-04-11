import React from 'react';
import { Layout, Typography, Divider } from 'antd';

const { Footer } = Layout;

const SWFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Typography.Text
        type="secondary"
        style={{
          fontSize: 13,
        }}
      >
        <a>京ICP备********号-3</a>
        <Divider type="vertical" />
        <a>京公网安备**************</a>
      </Typography.Text>
    </Footer>
  );
};

export default SWFooter;
