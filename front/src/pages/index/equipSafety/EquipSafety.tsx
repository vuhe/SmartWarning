import React from 'react';
import {
  Layout,
  Collapse,
  Row,
  Col,
  Card,
  Tooltip,
  Table,
  Divider,
  Typography,
  Button,
} from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import EquipMessage from './equipMessage/EquipMessage';
import { pieConfig } from '@/utils/simulatedData';
import SWFooter from '@/components/SWFooter';

const { Content } = Layout;
const { Panel } = Collapse;

const messages = [
  {
    meterName: '传感器#1001',
    safeOfficer: '_chan_',
    location: '#14号宿舍楼14549',
    status: 1,
    record: `已处理电流值超标8%警报（2小时前）`,
  },
  {
    meterName: '传感器#1002',
    safeOfficer: '_chenyh',
    location: '#14号宿舍楼14550',
    status: 1,
    record: `已处理电流值超标10%警报（3小时前）`,
  },
  {
    meterName: '传感器#1003',
    safeOfficer: '_chad',
    location: '#15号宿舍楼15551',
    status: 1,
    record: `Data disk type: MongoDB
    Database version: 3.4
    Package: dds.mongo.mid
    Storage space: 10 GB
    Replication factor: 3`,
  },
  {
    meterName: '传感器#1004',
    safeOfficer: '_liu',
    location: '#14号宿舍楼14552',
    status: 0,
    record: `Data disk type: MongoDB
    Database version: 3.4
    Package: dds.mongo.mid
    Storage space: 10 GB
    Replication factor: 3`,
  },
  {
    meterName: '传感器#1005',
    safeOfficer: '_wang',
    location: '#14号宿舍楼14553',
    status: 0,
    record: `Data disk type: MongoDB
    Database version: 3.4
    Package: dds.mongo.mid
    Storage space: 10 GB
    Replication factor: 3`,
  },
  {
    meterName: '传感器#1006',
    safeOfficer: '_lax',
    location: '#14号宿舍楼14554',
    status: 1,
    record: `修复功率过低警告`,
  },
];

const dataSource = [
  {
    key: '1',
    address: '#14宿舍楼 14550',
    equipment: '#14-5-1',
    time: '2021/4/10',
    alertLevel: 2,
    status: 0,
  },
  {
    key: '2',
    address: '#14宿舍楼 14551',
    equipment: '#14-5-2',
    time: '2021/4/10',
    alertLevel: 3,
    status: 1,
  },
  {
    key: '3',
    address: '#14宿舍楼 14552',
    equipment: '#14-5-3',
    time: '2021/4/8',
    alertLevel: 2,
    status: 0,
  },
  {
    key: '4',
    address: '#15宿舍楼 15540',
    equipment: '#15-5-1',
    time: '2021/4/10',
    alertLevel: 1,
    status: 1,
  },
  {
    key: '5',
    address: '#15宿舍楼 15541',
    equipment: '#15-5-2',
    time: '2021/4/9',
    alertLevel: 3,
    status: 1,
  },
];

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    render: (time: any, record: any) => {
      return <Typography.Text mark={record.status === 0 ? true : false}>[{time}]</Typography.Text>;
    },
  },
  {
    title: '地点',
    dataIndex: 'address',
    key: 'address',
    render: (address: any, record: any) => {
      return (
        <Typography.Text mark={record.status === 0 ? true : false}>[{address}]</Typography.Text>
      );
    },
  },
  {
    title: '设备',
    dataIndex: 'equipment',
    key: 'equipment',
    render: (equipment: any, record: any) => {
      return (
        <Typography.Text mark={record.status === 0 ? true : false}>[{equipment}]</Typography.Text>
      );
    },
  },
  {
    title: '警报等级',
    dataIndex: 'alertLevel',
    key: 'alertLevel',
    render: (alertLevel: any, record: any) => {
      return (
        <Typography.Text mark={record.status === 0 ? true : false}>
          [{alertLevel}级]
        </Typography.Text>
      );
    },
  },
  {
    title: '处理状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: number) => {
      return status === 0 ? (
        <>
          <Typography.Text mark>[未处理]</Typography.Text>
          <Button type="link">去处理</Button>
        </>
      ) : (
        <Typography.Text>[已处理]</Typography.Text>
      );
    },
  },
];

class EquipSafety extends React.Component<any, any> {
  state = { meterMessage: messages[0] };

  // 折叠面板切换回调
  changeCollapse = (params?: any): any => {
    if (params) {
      this.setState({
        meterMessage: messages.find((item) => item.meterName == params),
      });
    }
  };

  render() {
    return (
      <>
        <Layout>
          <Content style={{ margin: '1px 0px 0px 0px' }}>
            <div style={{ padding: 8, background: '#fff', minHeight: 370 }}>
              <Row>
                <Col span={6}>
                  <Card title="设备信息图" hoverable style={{ width: 350, height: 650 }}>
                    <Pie {...pieConfig} />
                  </Card>
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={8}>
                      <div style={{ height: '250px', overflow: 'auto' }}>
                        <Collapse accordion onChange={this.changeCollapse}>
                          {messages.map((item: any) => {
                            return (
                              <Panel
                                key={item.meterName}
                                header={item.meterName}
                                extra={
                                  <Tooltip title={item.status ? '设备已联网' : '设备未联网'}>
                                    <WifiOutlined
                                      style={{ color: `${item.status ? 'blue' : 'grey'}` }}
                                    />
                                  </Tooltip>
                                }
                              >
                                {item.record}
                              </Panel>
                            );
                          })}
                        </Collapse>
                      </div>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={15}>
                      <EquipMessage {...this.state.meterMessage} />
                    </Col>
                  </Row>
                  <Divider orientation="left">预警处理表</Divider>
                  <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
                </Col>
              </Row>
            </div>
          </Content>
          <SWFooter></SWFooter>
        </Layout>
      </>
    );
  }
}

export default EquipSafety;
