import React from 'react';
import {
  Layout,
  Descriptions,
  Table,
  Tag,
  Space,
  Button,
  Card,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import { FormOutlined, CloseCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { getAllUserList, addUser, deleteUser } from '@/services/user';
import SWFooter from '@/components/SWFooter';
import store from '@/redux/store';
import { isAdmin } from '@/utils/authorize';

const { Content } = Layout;

class User extends React.Component<any, any> {
  state = {
    // 添加用户信息模态框是否可见
    visible: false,
    // 用户信息
    userInfo: {
      username: '',
      type: 'admin',
      id: '2018001',
      authority: ['NONE'],
      status: '正常登入使用中',
    },
    // 管理用户列表
    userList: [],
  };

  constructor(props: any) {
    super(props);
    // 订阅Redux的状态
    store.subscribe(this.storeChange);
  }

  // 状态改变
  storeChange = () => {
    this.setState(store.getState(), () => {
      console.log(store.getState());
    });
  };

  componentDidMount = (): void => {
    if (isAdmin()) this.getList();
    this.setState(store.getState());
  };

  // 获取所有用户信息
  getList = () => {
    // 获取所有用户信息
    getAllUserList()
      .then((res) => res.data)
      .then((result) => {
        // console.log(result);
        if (result.code == 200) {
          this.setState({
            userList: result.data.map((item: any, index: number) => {
              if (item.role === 'User') item.role = '管理员';
              else item.role = '?';
              item.authority = ['null'];
              item.id = index;
              item.key = item.username;
              return item;
            }),
          });
        } else {
          message.error(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 展示添加用户模态框
  showModal = (): void => {
    this.setState({
      visible: true,
    });
  };

  // 添加用户信息表单完成事件
  onFinish = (values: any): void => {
    console.log(values);
    addUser({ username: values.username, password: values.password, role: 'User' })
      .then((res) => res.data)
      .then((result) => {
        console.log(result);
        if (result.message === 'success') {
          message.success('添加成功');
          this.setState({
            visiable: false,
          });
          this.getList();
        } else {
          message.error('添加失败');
        }
      })
      .catch((error) => console.log(error));
  };

  // 删除处理方法
  delete = (_username: string): any => {
    console.log(_username);
    deleteUser({ username: _username, password: ' ', role: 'User' });
  };

  // 修改处理方法
  modify = (data: any) => {
    console.log(data);
  };

  render(): any {
    return (
      <>
        <Layout>
          <Content style={{ margin: '0 4px 0px 4px' }}>
            <div style={{ padding: 16, background: '#fff', minHeight: 370 }}>
              <Descriptions title={<h2>{this.state.userInfo.username}</h2>} bordered>
                <Descriptions.Item key="用户名" label="用户名">
                  {this.state.userInfo.username}
                </Descriptions.Item>
                <Descriptions.Item key="id" label="id">
                  {/* {this.state.userInfo.id} */}**
                </Descriptions.Item>
                <Descriptions.Item key="用户类型" label="用户类型">
                  {this.state.userInfo.type}
                </Descriptions.Item>
                <Descriptions.Item key="权限" label="权限" span={2}>
                  {this.state.userInfo.authority[0] === 'ALL' ? (
                    <Tag color="green">ALL</Tag>
                  ) : (
                    <Tag color="green">NONE</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item key="用户状态" label="用户状态" span={1}>
                  {this.state.userInfo.status}
                </Descriptions.Item>
                <Descriptions.Item key="备注" label="备注">
                  ********************
                  <br />
                  ********************
                </Descriptions.Item>
              </Descriptions>
              <br />
              {isAdmin() ? (
                <Card
                  title="用户管理"
                  extra={
                    <Button type="primary" onClick={this.showModal}>
                      添加用户
                    </Button>
                  }
                  bordered={false}
                  bodyStyle={{
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <Table
                    dataSource={this.state.userList}
                    pagination={false}
                    style={{
                      marginTop: '20px',
                    }}
                  >
                    <Table.Column title="用户名" dataIndex="username" key="username" />
                    <Table.Column title="ID" dataIndex="id" key="id" />
                    <Table.Column title="用户类型" dataIndex="role" key="role" />
                    <Table.Column
                      title="权限"
                      key="authority"
                      dataIndex="authority"
                      render={(tags: string[]): any => (
                        <>
                          {tags.map((tag: string) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                              color = 'volcano';
                            }
                            return (
                              <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                              </Tag>
                            );
                          })}
                        </>
                      )}
                    />
                    <Table.Column
                      title="操作"
                      dataIndex="authorities"
                      key="action"
                      render={(text: any, record: any): any => {
                        // console.log(record);
                        return (
                          <Space size="middle">
                            <Button
                              type="primary"
                              icon={<FormOutlined />}
                              onClick={() => this.modify(record)}
                            >
                              修改
                            </Button>
                            <Button
                              type="primary"
                              danger
                              icon={<CloseCircleOutlined />}
                              onClick={() => this.delete(record.username)}
                            >
                              删除
                            </Button>
                          </Space>
                        );
                      }}
                    />
                  </Table>
                </Card>
              ) : null}
            </div>
          </Content>
          <SWFooter />
        </Layout>

        {/* 添加用户模态框 */}
        <Modal
          visible={this.state.visible}
          title="添加用户"
          // onOk={this.handleOk}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
          footer={null}
        >
          <Form
            {...{
              labelCol: {
                span: 4,
              },
              wrapperCol: {
                span: 14,
              },
            }}
            onFinish={this.onFinish}
            style={{ margin: 20, width: '100%' }}
          >
            <Form.Item
              key="1"
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="username"
              />
            </Form.Item>
            <Form.Item
              key="2"
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="password"
              />
            </Form.Item>
            <Form.Item key="3">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: '100%',
                }}
              >
                添加
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default User;
