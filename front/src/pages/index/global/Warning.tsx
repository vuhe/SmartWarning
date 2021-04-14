import React from 'react';
import { List, Typography, Divider, Descriptions } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

export default React.memo(function Waring(props: any) {
  const { warningMessage } = props;
  return (
    <>
      <Descriptions
        title={
          <Divider orientation="left">
            <WarningOutlined />
            <a style={{ color: 'red' }}>最近一次警报</a>
            发生在一小时前
          </Divider>
        }
        layout="vertical"
        bordered
        column={5}
      >
        <Descriptions.Item label="日期">2020/4/10</Descriptions.Item>
        <Descriptions.Item label="警报等级">二级</Descriptions.Item>
        <Descriptions.Item label="地点">#14宿舍楼</Descriptions.Item>
        <Descriptions.Item label="设备">#14-5-01</Descriptions.Item>
        <Descriptions.Item label="状态">未处理</Descriptions.Item>
      </Descriptions>
      <Divider orientation="left"></Divider>
      <div style={{ height: '150px', overflow: 'auto', background: '#EEEEEE' }}>
        <List
          bordered
          dataSource={warningMessage}
          renderItem={(item: { type: string; message: string }) => (
            <List.Item>
              <Typography.Text mark> [{item.type}]</Typography.Text>：{item.message}
            </List.Item>
          )}
        />
      </div>
    </>
  );
});
