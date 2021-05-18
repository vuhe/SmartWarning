import React from 'react';
import { Layout, Menu, Anchor } from 'antd';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { AreaChartOutlined, BarChartOutlined } from '@ant-design/icons';
import SWFooter from '@/components/SWFooter';
import store from '@/redux/store';

const { Sider, Content } = Layout;

export interface StatisticLayoutProps extends RouteComponentProps {}

interface StatisticLayoutState {
  drives?: any[];
}

/**
 * 数据页面的基础布局
 */
class StatisticLayout extends React.Component<any, StatisticLayoutState> {
  state: StatisticLayoutState = {};

  constructor(props: any) {
    super(props);
    // 从 store 中初始化 drives
    this.state.drives = (store.getState() as any).drives;
    // 订阅 Redux 的状态
    store.subscribe(this.storeChange);
  }

  // 状态改变
  storeChange = () => {
    this.setState(store.getState);
  };

  render() {
    const { children } = this.props;

    return (
      <Layout>
        <Sider width={144} theme="light" style={{ minHeight: '92vh' }}>
          <Anchor offsetTop={42}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['tables']}>
              <Menu.Item key="tables">
                <Link to="/index/statistic/all">
                  <AreaChartOutlined />
                  <span>总数据</span>
                </Link>
              </Menu.Item>

              {this.state.drives ? (
                <>
                  <Menu.SubMenu
                    key="教学楼设备"
                    title={
                      <span>
                        <BarChartOutlined />
                        <span>教学楼设备</span>
                      </span>
                    }
                  >
                    {this.state.drives
                      .filter((drive: SmartWarning.Drive) => drive.driveName.startsWith('教学楼'))
                      .map((drive: SmartWarning.Drive) => {
                        return (
                          <Menu.Item key={drive.id + drive.driveName}>
                            <Link to={`/index/statistic/charts/${drive.driveName}`}>
                              {/* {drive.icon ? <route.icon /> : null} */}
                              <span>{drive.driveName}</span>
                            </Link>
                          </Menu.Item>
                        );
                      })}
                  </Menu.SubMenu>
                  <Menu.SubMenu
                    key="宿舍楼设备"
                    title={
                      <span>
                        <BarChartOutlined />
                        <span>宿舍楼设备</span>
                      </span>
                    }
                  >
                    {this.state.drives
                      .filter((drive: SmartWarning.Drive) => drive.driveName.startsWith('宿舍楼'))
                      .map((drive: SmartWarning.Drive) => {
                        return (
                          <Menu.Item key={drive.id + drive.driveName}>
                            <Link to={`/index/statistic/charts/${drive.driveName}`}>
                              {/* {drive.icon ? <route.icon /> : null} */}
                              <span>{drive.driveName}</span>
                            </Link>
                          </Menu.Item>
                        );
                      })}
                  </Menu.SubMenu>
                </>
              ) : null}
            </Menu>
          </Anchor>
        </Sider>
        <Layout>
          <Content style={{ margin: '4px 8px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <SWFooter />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(StatisticLayout);
