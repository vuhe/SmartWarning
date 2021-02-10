import React from 'react';
import { Menu, Dropdown, Input, Row, Col, Modal } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { SubMenu } = Menu;
const { confirm } = Modal;

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/index">用户管理</Link>
    </Menu.Item>
    <Menu.Item>操作日志</Menu.Item>
    <Menu.Item>
      <Link to="/login">退出登录</Link>
    </Menu.Item>
    {/* <Menu.Item
      onClick={() => {
        confirm({
          title: '确定退出登录吗?',
          icon: <ExclamationCircleOutlined />,
          content: '点击确定即退出登录',
          onOk() {
            console.log('OK');
            // this.props.history.push('/login');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }}
    >
      退出登录
    </Menu.Item> */}
  </Menu>
);

export interface NavigationBarState {
  current: string;
  date: Date;
}

class NavigationBar extends React.Component<any, NavigationBarState> {
  state: NavigationBarState = { current: 'login', date: new Date() };

  handleClick = (e: any) => {
    this.setState({ current: e.key });
  };

  onSearch = (value: string) => {
    console.log(value);
  };

  render() {
    const { history } = this.props;
    return (
      <>
        <Row justify="end" align="middle" style={{ backgroundColor: '#fff' }}>
          <Col span={6}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              theme="light"
            >
              <Menu.Item key="login" icon={<MailOutlined />}>
                <Link to="/index/global">主页</Link>
              </Menu.Item>
              <Menu.Item key="statistic" icon={<AppstoreOutlined />}>
                <Link to="/index/statistic">电表数据</Link>
              </Menu.Item>
              <SubMenu key="SubMenu" icon={<SettingOutlined />} title="更多">
                <Menu.ItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </Col>
          <Col span={3}></Col>
          <Col span={6}>
            <h2>电气火灾智慧预警系统</h2>
          </Col>
          <Col span={2}></Col>
          <Col span={1}>{this.state.date.toLocaleDateString()}</Col>
          <Col span={4}>
            <Search
              placeholder="请输入查询内容"
              allowClear
              onSearch={this.onSearch}
              enterButton
              style={{ padding: '0 8px 0' }}
            />
          </Col>

          <Col span={2}>
            <Dropdown.Button
              type="primary"
              overlay={menu}
              placement="bottomRight"
              icon={<UserOutlined />}
              onClick={() => {
                // history.push('/index');
              }}
            >
              用户
            </Dropdown.Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default NavigationBar;
