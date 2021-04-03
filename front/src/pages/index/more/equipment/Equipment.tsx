import React from 'react';
import { Card, Space, Statistic, Alert, notification, Modal } from 'antd';
import { CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { PieConfig } from '@ant-design/charts/es/pie';

const testData = [
  {
    type: '正常',
    value: 950,
  },
  {
    type: '警告',
    value: 52,
  },
  {
    type: '故障',
    value: 18,
  },
];

const config: PieConfig = {
  appendPadding: 10,
  data: testData,
  angleField: 'value',
  colorField: 'type',
  color: ({ type }): string => {
    let returnColor;
    switch (type) {
      case '正常':
        returnColor = '#87d068';
        break;
      case '警告':
        returnColor = 'yellow';
        break;
      case '故障':
        returnColor = '#f50';
        break;
      default:
        returnColor = 'grey';
        break;
    }
    return returnColor;
  },
  radius: 1,
  innerRadius: 0.64,
  meta: {
    value: {
      formatter: function formatter(num: string) {
        return ''.concat(num, ' 台');
      },
    },
  },
  label: {
    type: 'inner',
    offset: '-50%',
    content: '{value}',
    style: {
      textAlign: 'center',
      fontSize: 14,
    },
    autoRotate: false,
  },
  interactions: [
    { type: 'element-selected' },
    { type: 'element-active' },
    { type: 'pie-statistic-active' },
  ],
};

// 通知消息配置信息
export interface notificationConfig {
  message: string;
  description: string;
  placement?: string;
  icon?: any; // 图标
}

/** 设备信息页面 */
class Equipment extends React.Component<any, any> {
  openInfoModal = (): void => {
    const _this = this;
    Modal.info({
      title: '设备警告信息',
      okText: '确定',
      content: (
        <Space>
          <Card
            title="警告设备"
            hoverable
            bordered={false}
            headStyle={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
            bodyStyle={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <Statistic value={52} valueStyle={{ color: '#f50' }} prefix={<CloseCircleOutlined />} />
          </Card>
          <Card
            title="报警设备"
            hoverable
            bordered={false}
            headStyle={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
            bodyStyle={{
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <Statistic value={18} valueStyle={{ color: 'gold' }} prefix={<WarningOutlined />} />
          </Card>
        </Space>
      ),
      onOk() {
        for (let i = 0; i < 3; i++) {
          _this.openNotification({
            message: `设备警告信息 ${i}`,
            description: `设备详细警告信息 ${i}`,
          });
        }
      },
    });
  };
  /** 弹出通知提示框 */
  openNotification = (option: notificationConfig) => {
    notification.warning({
      message: option.message,
      description: '设备详细警告信息',
      placement: 'topRight',
      top: 55,
      duration: 4,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  componentDidMount = () => {
    this.openInfoModal();
  };

  render() {
    return (
      <>
        <Space align="start">
          <Card title="设备信息图" hoverable style={{ width: 450 }}>
            <Pie {...config} />
          </Card>
          <Card title hoverable bordered style={{ width: 720 }}>
            <Statistic title="总设备数" value={1020} />
            <Alert message="正常：950" type="success" showIcon style={{ marginTop: '4px' }} />
            <Alert message="警告：52" type="warning" showIcon style={{ marginTop: '4px' }} />
            <Alert message="故障：18" type="error" showIcon style={{ marginTop: '4px' }} />
          </Card>
        </Space>
      </>
    );
  }
}

export default Equipment;
