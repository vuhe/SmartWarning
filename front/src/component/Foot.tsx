import React, { memo } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'antd';

const { Footer } = Layout;

const Foot = memo(function Foot() {
    return <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>;
});

export default hot(Foot);
