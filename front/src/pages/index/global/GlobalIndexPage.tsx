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
  // Collapse,
  // Tag,
  Modal,
} from 'antd';
// import { CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Warning from '@/pages/index/global/Warning';
import ChinaMap from './maps/ChinaMap';
import uuid from '@/utils/uuid';

// const { Panel } = Collapse;
const data = [
  '发出危险预警(气温异常升高)',
  '发出危险预警(收到烟雾报警)',
  '发出危险预警(气温异常升高)',
  '发出警告(电压过低)',
  '发出警告(电压过低)',
];
// 警告模拟信息
const warningMessage = [
  {
    type: '危险',
    message: '14号宿舍楼一层火灾风险系数升高 20%',
  },
  {
    type: '警告',
    message: '15号宿舍楼二层设备电压偏低',
  },
  {
    type: '危险',
    message: '15号宿舍楼四层设备电流值偏差较大',
  },
  {
    type: '警告',
    message: '14号宿舍楼一层烟感设备未联网',
  },
  {
    type: '警告',
    message: '14号宿舍楼二层电压设备未联网',
  },
  {
    type: '警告',
    message: '14号宿舍楼六层设备电压偏低',
  },
];

// 待办事项模拟信息
// const schedule = [
//   {
//     title: '待办事项一',
//     message: '请检查14号宿舍楼烟感设备',
//     tagIcon: CloseCircleOutlined,
//     tagColor: 'error',
//     time: '一小时前',
//   },
//   {
//     title: '待办事项二',
//     message: '请检查14号宿舍二层电表是否联网',
//     tagIcon: ExclamationCircleOutlined,
//     tagColor: 'warning',
//     time: '三小时前',
//   },
//   {
//     title: '待办事项三',
//     message: '请检查15号宿舍楼电表连接是否正常',
//     tagIcon: CloseCircleOutlined,
//     tagColor: 'warning',
//     time: '一天前',
//   },
// ];

export interface GlobalIndexPageState {
  /** 控制日志 Drawer 是否显示 */
  logVisible: boolean;
  /** 控制设备 Drawer 是否显示 */
  equipmentVisible: boolean;
  /** 今日风险系数百分比 */
  percent: number;
}

// 首页 /index/global
class GlobalIndexPages extends React.Component<any, GlobalIndexPageState> {
  state: GlobalIndexPageState = { logVisible: false, equipmentVisible: false, percent: 5 };

  componentDidMount() {
    Modal.warning({
      title: '今日风险警告信息',
      closable: true,
      content: (
        <>
          <Warning warningMessage={warningMessage} />
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
            {/* <Row>
              <Col span={16}>
                <div style={{ height: '100px', overflow: 'auto', background: '#EEEEEE' }}>
                  {warningMessage.map((item: { type: string; message: string }) => {
                    return (
                      <>
                        <Typography.Text key={uuid()} mark>
                          [{item.type}]
                        </Typography.Text>
                        ：{item.message}
                        <br />
                      </>
                    );
                  })}
                </div>
              </Col>
              <Col span={8}></Col>
            </Row> */}

            <Space align="center" size="large">
              <div>
                <Divider orientation="left">
                  <Button onClick={this.openEquipmentDrawer}>设备信息</Button>
                </Divider>
                <Card bordered hoverable style={{ width: 500 }}>
                  <Statistic title="总设备数" value={1020} />
                  <Alert message="正常：950" type="success" showIcon style={{ marginTop: '4px' }} />
                  <Alert message="警告：52" type="warning" showIcon style={{ marginTop: '4px' }} />
                  <Alert message="故障：18" type="error" showIcon style={{ marginTop: '4px' }} />
                </Card>
              </div>
              <div style={{ marginRight: '10px' }}>
                <Divider orientation="right">
                  今日风险系数：
                  <Progress
                    type="circle"
                    width={80}
                    percent={this.state.percent}
                    strokeColor="#87d068"
                  />
                </Divider>
              </div>
            </Space>
            <Divider orientation="left">
              <Button onClick={this.openLogDrawer}>日志信息</Button>
            </Divider>
            <Card bordered hoverable style={{ marginRight: 15 }}>
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item key={uuid()}>
                    <Typography.Text mark>[设备#**]</Typography.Text> {item}
                  </List.Item>
                )}
              />
            </Card>
            {/* <Divider orientation="left">
              <Button onClick={this.openEquipmentDrawer}>待办事项</Button>
            </Divider>
            <Collapse accordion={false} bordered ghost>
              {schedule.map((item: any) => {
                return (
                  <Panel
                    key={uuid()}
                    header={item.title}
                    extra={
                      <Tag icon={<item.tagIcon />} color={item.tagColor}>
                        {item.time}
                      </Tag>
                    }
                  >
                    <p>{item.message}</p>
                  </Panel>
                );
              })}
            </Collapse> */}
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
              <List.Item key={uuid()}>
                <Typography.Text mark>[设备#**]</Typography.Text>
                详细日志信息: {item}
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
              <List.Item key={uuid()}>
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
