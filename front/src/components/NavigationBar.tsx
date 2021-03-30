import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Dropdown, Input, Row, Col, Modal, Anchor, message } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { setToken } from '../utils/authorize';

const { Search } = Input;
const { SubMenu } = Menu;
const { confirm } = Modal;

// "更多" 路径跳转配置项
const morePaths: { path: string; title: string }[] = [
  { path: '/index/more/risk', title: '今日风险图' },
  { path: '/index/more/schedule', title: '待办事项' },
  { path: '/index/more/equipment', title: '设备信息' },
  { path: '/index/more/log', title: '日志记录' },
];

export interface NavigationBarState {
  current: string;
  date: Date;
}

// 应用头部 Header 导航栏
class NavigationBar extends React.Component<any, NavigationBarState> {
  state: NavigationBarState = { current: 'index', date: new Date() };

  constructor(props: any) {
    super(props);
  }

  /**
   * 菜单切换处理方法
   * @param e
   */
  handleClick = (e: any) => {
    this.setState({ current: e.key });
  };

  /**
   * 搜索处理方法
   */
  onSearch = (value: string) => {
    console.log(value);
  };

  /**
   * 退出登录
   */
  exit = () => {
    const { history } = this.props;
    confirm({
      title: '确定退出登录吗?',
      icon: <ExclamationCircleOutlined />,
      content: '点击确定即退出登录',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        history.push('/login');
        setToken('');
        message.success('退出登录成功');
      },
    });
  };

  render() {
    return (
      <>
        <Anchor>
          <Row justify="end" align="middle" style={{ backgroundColor: '#fff' }}>
            <Col span={8}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                theme="light"
              >
                <Menu.Item key="index" icon={<MailOutlined />}>
                  <Link to="/index/global">主页</Link>
                </Menu.Item>

                <Menu.Item key="statistic" icon={<AppstoreOutlined />}>
                  <Link to="/index/statistic">数据检测</Link>
                </Menu.Item>

                <SubMenu key="more" title="更多" icon={<SettingOutlined />}>
                  {morePaths.map((item: { path: string; title: string }) => {
                    return (
                      <Menu.Item key={item.path}>
                        <Link to={item.path}>{item.title}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              </Menu>
            </Col>
            <Col span={1}></Col>
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
                overlay={
                  <Menu>
                    <Menu.Item>用户管理</Menu.Item>
                    <Menu.Item>操作日志</Menu.Item>
                    <Menu.Item onClick={() => this.exit()}>退出登录</Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
                icon={<UserOutlined />}
              >
                用户
              </Dropdown.Button>
            </Col>
          </Row>
        </Anchor>
      </>
    );
  }
}

export default withRouter(NavigationBar);
