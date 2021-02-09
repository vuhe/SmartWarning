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
} from 'antd';
import * as echarts from 'echarts';

const data = ['发出警告.', '发出警告.', '发出警告.', '发出警告.', '发出警告.'];

// echarts 配置项
const option: any = {
  // title: { text: '折线图' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
};

export interface GlobalIndexPageState {
  /** 控制日志右侧Drawer是否显示 */
  logVisible: boolean;
  /** 控制设备左侧Drawer是否显示 */
  equipmentVisible: boolean;
  /** 今日风险系数百分比 */
  percent: number;
}

class GlobalIndexPages extends React.Component<any, GlobalIndexPageState> {
  state: GlobalIndexPageState = { logVisible: false, equipmentVisible: false, percent: 12 };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const myCharts = echarts.init(document.getElementById('myEcharts') as HTMLElement);
    myCharts.setOption(option);
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
        <Row justify="center" align="top">
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={2}>
            <Progress type="circle" percent={this.state.percent} strokeColor="#87d068" />
          </Col>
        </Row>
        <Row justify="space-around" align="middle">
          <Col span={6}>
            <Divider orientation="left">
              <Button onClick={this.openEquipmentDrawer}>设备信息</Button>
            </Divider>
            <Card bordered style={{ width: 350 }}>
              <Statistic title="总设备数" value={1024} />
              <Alert message="正常：1000" type="success" showIcon style={{ marginTop: '4px' }} />
              <Alert message="警告：24" type="warning" showIcon style={{ marginTop: '4px' }} />
              <Alert message="故障：0" type="error" showIcon style={{ marginTop: '4px' }} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered style={{ width: 380, padding: 0 }}>
              <div id="myEcharts" style={{ margin: 0, width: '100%', height: 250 }}></div>
            </Card>
          </Col>
          <Col span={6}>
            <Divider orientation="right">
              <Button onClick={this.openLogDrawer}>日志信息</Button>
            </Divider>

            <List
              bordered
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text mark>[设备#**]</Typography.Text> {item}
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <Card title="警报窗口" bordered style={{ margin: '40px 5px 5px' }}>
          <p>地点:</p>
          <p>已报警显示:</p>
          <p>负责人:</p>
          <p>危险警报系数:</p>
        </Card>

        {/* 右侧日志抽屉 */}
        <Drawer
          title="详细日志信息"
          placement="right"
          width={512}
          closable={false}
          onClose={this.logOnClose}
          visible={this.state.logVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
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

        {/* 左侧设备抽屉 */}
        <Drawer
          title="Equipment Drawer"
          placement="left"
          width={512}
          closable={false}
          onClose={this.equipmentOnClose}
          visible={this.state.equipmentVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
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
