import React from 'react';
import { List, Button, Typography, Space, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const listData: any[] = [];

class Schedule extends React.Component<any, any> {
  render() {
    for (let i = 1; i < 23; i++) {
      listData.push({
        title: `待办事项标题 ${i}`,
        description: `待办事项具体描述 ${i}`,
        content: '123',
      });
    }
    return (
      <>
        <List
          bordered
          itemLayout="vertical"
          size="default"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={listData}
          header={<Title level={3}>待办事项</Title>}
          renderItem={(item) => (
            <List.Item
              extra={
                <Space>
                  <Tooltip title="编辑已完成">
                    <Button type="primary" shape="circle" icon={<CheckOutlined />} />
                  </Tooltip>
                  <Tooltip title="删除此事项">
                    <Button danger shape="circle" icon={<CloseOutlined />} />
                  </Tooltip>
                </Space>
              }
            >
              <List.Item.Meta title={<a href="/#">{item.title}</a>} description="待办事项" />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default Schedule;
