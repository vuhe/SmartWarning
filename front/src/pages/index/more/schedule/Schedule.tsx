import React from 'react';
import { List, Button, Typography, Space, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

// 待办事项模拟信息
const scheduleListData = [
  {
    title: '待办事项一',
    description: '请检查14号宿舍楼烟感设备',
    content: '123',
  },
  {
    title: '待办事项二',
    description: '请检查14号宿舍二层电表是否联网',
    content: '123',
  },
  {
    title: '待办事项三',
    description: '请检查15号宿舍楼电表连接是否正常',
    content: '123',
  },
];

class Schedule extends React.Component<any, any> {
  render() {
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
          dataSource={scheduleListData}
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
              <List.Item.Meta title={<a>{item.title}</a>} description={item.description} />
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default Schedule;
