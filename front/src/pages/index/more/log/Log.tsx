import React from 'react';
import { List, Typography, PageHeader } from 'antd';

const logList: any[] = [];

class Log extends React.Component<any, any> {
  render() {
    for (let i = 0; i < 20; i++) {
      logList.push({
        title: `日志 ${i}`,
        description: `日志描述 ${i}`,
        content: `日志详细信息 ${i}`,
      });
    }

    return (
      <>
        <PageHeader
          className="site-page-header"
          title="详细日志信息"
          subTitle="This is a subtitle"
        />
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
            <List.Item>
              <Typography.Text mark>[设备#**]</Typography.Text> {item.content}
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default Log;
