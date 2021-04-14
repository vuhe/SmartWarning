import React from 'react';
import { Layout, Card, Table, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SWFooter from '@/components/SWFooter';
import { getUserLogs } from '@/services/user';

class UserLog extends React.Component<any, any> {
  state = {
    userLogs: [],
    columns: [
      {
        key: 'username',
        title: '用户名',
        dataIndex: 'username',
      },
      {
        key: 'changeTime',
        title: '登录时间',
        dataIndex: 'changeTime',
        render: (millisecond: number): any => {
          // 将传入的毫秒数转化为格式： 2021/4/11上午9:38:15
          return new Date(millisecond).toLocaleString();
        },
      },
      {
        key: 'operationDetail',
        title: '登录信息',
        dataIndex: 'operationDetail',
      },
    ],
  };

  componentDidMount = (): void => {
    getUserLogs()
      .then((res) => res.data)
      .then((result) => {
        if (result.message === 'success') {
          this.setState({
            userLogs: result.data,
          });
        } else {
          message.info('操作日志信息加载失败');
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <Layout>
          <Layout.Content style={{ margin: '0 4px 0px 4px' }}>
            <div style={{ padding: 16, background: '#fff', minHeight: 370 }}>
              <Card
                bordered
                title="用户操作日志"
                extra={
                  <UserOutlined
                    style={{
                      color: '#eb2f96',
                    }}
                  />
                }
              >
                <Table dataSource={this.state.userLogs} columns={this.state.columns} />
              </Card>
            </div>
          </Layout.Content>
        </Layout>
        <SWFooter />
      </>
    );
  }
}

export default UserLog;
