import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Dropdown, Input, Row, Col, Modal, Anchor, message, Calendar, Popover } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { routes } from '../router/routers';
import { setToken } from '../utils/authorize';
import getRoute from '../utils/routeUtils';
import store from '../redux/store';
import { changeMenuitemActionCreator } from '@/redux/actionCreator';

const { Search } = Input;
const { SubMenu } = Menu;
const { confirm } = Modal;

export interface NavigationBarState {
  navigatorCurrent: string;
  date: Date;
}

// 应用头部 Header 导航栏
class NavigationBar extends React.Component<any, NavigationBarState> {
  state: NavigationBarState = { navigatorCurrent: '', date: new Date() };

  constructor(props: any) {
    super(props);
    // 订阅Redux的状态
    store.subscribe(this.storeChange);
  }

  // 状态改变
  storeChange = () => {
    this.setState(store.getState());
  };

  /**
   * 菜单切换处理方法
   * @param e
   */
  handleClick = (e: any) => {
    this.setState({ navigatorCurrent: e.key });
    store.dispatch(changeMenuitemActionCreator(e.key));
  };

  // 搜索处理方法
  onSearch = (value: string) => {
    console.log(value);
  };

  // 用户管理页面简单逻辑处理
  toUser = () => {
    const { history } = this.props;
    history.push('/index/user');
    // 跳转到用户管理页面，去除菜单栏选中状态
    store.dispatch(changeMenuitemActionCreator(''));
  };

  // 查看用户操作日志页面简单逻辑处理
  toUserLog = () => {
    const { history } = this.props;
    history.push('/index/userLog');
    store.dispatch(changeMenuitemActionCreator(''));
  };

  // 退出登录
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
    // 获取更多路由
    const moreRoutes = getRoute(routes, '/index/more');

    return (
      <>
        <Anchor>
          <Row justify="end" align="middle" style={{ backgroundColor: '#fff' }}>
            <Col span={8}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.navigatorCurrent]}
                mode="horizontal"
                theme="light"
              >
                <Menu.Item key="index" icon={<MailOutlined />}>
                  <Link to="/index/global">主页</Link>
                </Menu.Item>
                <Menu.Item key="equip_safety" icon={<MailOutlined />}>
                  <Link to="/index/equip_safety">设备安全</Link>
                </Menu.Item>
                <Menu.Item key="statistic" icon={<AppstoreOutlined />}>
                  <Link to="/index/statistic">数据检测</Link>
                </Menu.Item>

                <SubMenu key="more" title="更多" icon={<SettingOutlined />}>
                  {moreRoutes.children.map((item: { path: string; title: string }) => {
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
            <Col span={1}>
              <Popover
                content={
                  <Calendar
                    style={{ width: '300px' }}
                    fullscreen={false}
                    headerRender={() => {
                      return <></>;
                    }}
                  />
                }
              >
                {this.state.date.toLocaleDateString()}
              </Popover>
            </Col>
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
                    <Menu.Item onClick={this.toUser}>用户管理</Menu.Item>
                    <Menu.Item onClick={this.toUserLog}>操作日志</Menu.Item>
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
