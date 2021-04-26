import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;

// SmartWarning Footer 组件
const SWFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Typography.Text
        type="secondary"
        style={{
          fontSize: 13,
        }}
      >
        <a href="http://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          豫ICP备19043858号
        </a>
      </Typography.Text>
    </Footer>
  );
};

export default SWFooter;
