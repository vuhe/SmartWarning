import React from 'react';
import { List, Typography, Statistic, Space, Divider, Descriptions } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default React.memo(function Waring() {
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
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
    </>
  );
});
