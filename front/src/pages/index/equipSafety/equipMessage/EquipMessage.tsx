import React from 'react';
import { Card, Tooltip, Descriptions, Badge } from 'antd';
import { WifiOutlined } from '@ant-design/icons';

export default React.memo(function EquipMessage(props: any) {
  const { meterName, safeOfficer, location, status, record } = props;

  return (
    <Card
      bordered
      hoverable
      headStyle={{
        padding: '0px 10px',
      }}
      bodyStyle={{
        padding: '10px',
      }}
      extra={
        <Tooltip title={status === 0 ? '设备未联网' : '设备已联网'}>
          <WifiOutlined style={{ color: `${status === 0 ? 'grey' : 'blue'}` }} />
        </Tooltip>
      }
    >
      <Descriptions bordered>
        <Descriptions.Item label="电表名">{meterName}</Descriptions.Item>
        <Descriptions.Item label="安全员(维护人员)" span={2}>
          {safeOfficer}
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          <Badge
            status={status ? 'processing' : 'default'}
            text={status ? 'Running' : 'Not Running'}
          />
        </Descriptions.Item>
        <Descriptions.Item label="位置" span={2}>
          {location}
        </Descriptions.Item>
        <Descriptions.Item label="维护记录(最近一次)">{record}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
});
