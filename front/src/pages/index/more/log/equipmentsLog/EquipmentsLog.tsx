import React from 'react';
import { List, Typography, PageHeader } from 'antd';
// import uuid from '@/utils/uuid';

const logList: any[] = [];

// 设备日志组件
const EquipmentsLog = (props: any) => {
  const { equipmentID } = props;

  for (let i = 0; i < 10; i++) {
    logList.push({
      key: i,
      title: `日志 ${i}`,
      description: `日志描述 ${i}`,
      content: `日志详细信息 ${i}: 已处理电流值超标8%警报（${
        i + 1
      }小时前） 处理人：_liu_ 处理时间：***`,
    });
  }

  return (
    <>
      <PageHeader className="site-page-header" title="详细日志信息" subTitle="This is a subtitle" />
      <List
        bordered
        dataSource={logList}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item
            key={item.key}
            extra={<Typography.Text mark>[设备{equipmentID}]</Typography.Text>}
          >
            <Typography.Text mark>[设备{equipmentID}]</Typography.Text> {item.content}
          </List.Item>
        )}
      />
    </>
  );
};

export default EquipmentsLog;
