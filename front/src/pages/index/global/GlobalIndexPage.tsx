import React from 'react';
import {
  Card,
  Row,
  Col,
  Alert,
  Progress,
  Statistic,
  List,
  Divider,
  Typography,
  Button,
  Drawer,
  Space,
  Collapse,
  Tag,
  Modal,
} from 'antd';
import { CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Warning from '@/pages/index/global/Warning';
import ChinaMap from './maps/ChinaMap';

const { Panel } = Collapse;
const data = ['发出了警告.', '发出警告.', '发出警告.', '发出警告.', '发出警告.'];

export interface GlobalIndexPageState {
  /** 控制日志 Drawer 是否显示 */
  logVisible: boolean;
  /** 控制设备 Drawer 是否显示 */
  equipmentVisible: boolean;
  /** 今日风险系数百分比 */
  percent: number;
}

/**
 * 首页 /index/global
 */
class GlobalIndexPages extends React.Component<any, GlobalIndexPageState> {
  state: GlobalIndexPageState = { logVisible: false, equipmentVisible: false, percent: 5 };

  /**
   * 生命周期函数
   * 组件加载完成后执行
   */
  componentDidMount() {
    /** echarts 加载折线图 */
    // const myCharts = echarts.init(document.querySelector('#myEcharts') as HTMLElement, 'dark');
    // myCharts.setOption(riskMapOption);
    Modal.warning({
      title: '今日风险警告信息',
      closable: true,
      content: (
        <>
          <Warning />
        </>
      ),
      width: 800,
      okText: '知道了',
    });
  }

  /** 打开右侧日志抽屉 */
  openLogDrawer = (): void => {
    this.setState({
      logVisible: true,
    });
  };

  /** 关闭右侧日志抽屉 */
  logOnClose = (): void => {
    this.setState({
      logVisible: false,
    });
  };

  /** 打开左侧设备抽屉 */
  openEquipmentDrawer = (): void => {
    this.setState({
      equipmentVisible: true,
    });
  };

  /** 关闭左侧设备抽屉 */
  equipmentOnClose = (): void => {
    this.setState({
      equipmentVisible: false,
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col span={12}>
            <Row>
              <Col span={16}>
                <div style={{ height: '100px', overflow: 'auto', background: '#EEEEEE' }}>
                  <Typography.Text mark>[危险]</Typography.Text>
                  ：***火灾风险系数升高80%
                  <br />
                  <Typography.Text mark>[警告]</Typography.Text>：***设备电流不正常
                  <br />
                  <Typography.Text mark>[警告]</Typography.Text>：***设备烟雾报警
                  <br />
                  <Typography.Text mark>[警告]</Typography.Text>：***设备电压不正常
                  <br />
                  <Typography.Text mark>[警告]</Typography.Text>：***设备低压
                  <br />
                  <Typography.Text mark>[警告]</Typography.Text>：***设备温感75C°
                  <br />
                  <Typography.Text mark>[危险]</Typography.Text>
                  ：***设备电流不正常
                  <br />
                  <Typography.Text mark>[危险]</Typography.Text>
                  ：***火灾风险系数升高60%
                </div>
              </Col>
              <Col span={8}>
                <Divider orientation="right">
                  今日风险系数：
                  <Progress
                    type="circle"
                    width={70}
                    percent={this.state.percent}
                    strokeColor="#87d068"
                  />
                </Divider>
              </Col>
            </Row>

            <Space align="start" size="large">
              <div>
                <Divider orientation="left">
                  <Button onClick={this.openEquipmentDrawer}>设备信息</Button>
                </Divider>
                <Card bordered hoverable style={{ width: 330 }}>
                  <Statistic title="总设备数" value={1020} />
                  <Alert message="正常：950" type="success" showIcon style={{ marginTop: '4px' }} />
                  <Alert message="警告：52" type="warning" showIcon style={{ marginTop: '4px' }} />
                  <Alert message="故障：18" type="error" showIcon style={{ marginTop: '4px' }} />
                </Card>
              </div>
              <div style={{ marginRight: '10px' }}>
                <Divider orientation="right">
                  <Button onClick={this.openLogDrawer}>日志信息</Button>
                </Divider>
                <Card bordered hoverable style={{ width: 330 }}>
                  <List
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item>
                        <Typography.Text mark>[设备#**]</Typography.Text> {item}
                      </List.Item>
                    )}
                  />
                </Card>
              </div>
            </Space>
            <Divider orientation="left">
              <Button onClick={this.openEquipmentDrawer}>待办事项</Button>
            </Divider>
            <Collapse accordion={false} bordered ghost>
              <Panel
                header="待办事项一"
                key="1"
                extra={
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    一小时前
                  </Tag>
                }
              >
                <p>待办事项一</p>
              </Panel>
              <Panel
                header="待办事项二"
                key="2"
                extra={
                  <Tag icon={<ExclamationCircleOutlined />} color="warning">
                    三小时前
                  </Tag>
                }
              >
                <p>待办事项二</p>
              </Panel>
              <Panel
                header="待办事项三"
                key="3"
                extra={
                  <Tag icon={<ExclamationCircleOutlined />} color="warning">
                    一天前
                  </Tag>
                }
              >
                <p>待办事项三</p>
              </Panel>
            </Collapse>
          </Col>

          <Col span={12}>
            {/* 中国地图 */}
            <Card bordered>
              <div style={{ width: '100%', height: '600px', margin: 0 }}>
                <ChinaMap />
              </div>
            </Card>
          </Col>
        </Row>

        {/* 日志抽屉 */}
        <Drawer
          title="详细日志信息"
          placement="right"
          width={512}
          closable={false}
          onClose={this.logOnClose}
          visible={this.state.logVisible}
        >
          <p>Some contents...</p>
          <List
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[设备#**]</Typography.Text>详细日志信息: {item}
              </List.Item>
            )}
          />
        </Drawer>

        {/* 设备抽屉 */}
        <Drawer
          title="Equipment Drawer"
          placement="right"
          width={512}
          closable={false}
          onClose={this.equipmentOnClose}
          visible={this.state.equipmentVisible}
        >
          <p>Some contents...</p>
          <List
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[设备#**]</Typography.Text>
                详细设备信息: {item}
              </List.Item>
            )}
          />
        </Drawer>
      </>
    );
  }
}

export default GlobalIndexPages;
