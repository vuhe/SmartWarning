import React from 'react';
import { Card, Space, Statistic, Alert, notification, Modal } from 'antd';
import { CloseCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
import { equipmentPieConfig } from '@/utils/simulate/EquipmentPieConfig';

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
            <Pie {...equipmentPieConfig} />
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
