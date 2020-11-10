import React, { memo } from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { hot } from 'react-hot-loader/root';
import './App.scss';
import Router from '@/component/Router';
import Foot from '@/component/Foot';

const { Header, Content, Sider } = Layout;

interface CounterProps {
    initCollapsed?: boolean;
}

const App = memo(function App({ initCollapsed = false }: CounterProps) {
    const [collapsed, setCollapsed] = React.useState(initCollapsed);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                }}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Router />
                </Content>
                <Foot />
            </Layout>
        </Layout>
    );
});

export default hot(App);
