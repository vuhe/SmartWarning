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
import {
  FormOutlined,
  CloseCircleOutlined,
  UserOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import SWFooter from '@/components/SWFooter';
import store from '@/redux/store';
import { isAdmin } from '@/utils/authorize';
import { getAllUserList, addUser, deleteUser, modifyUser } from '@/services/user';

const { Content } = Layout;

// 用户管理页面
class User extends React.Component<any, any> {
  state = {
    // 添加用户信息模态框是否可见
    addUserModalVisible: false,
    // 修改用户密码模态框是否可见
    modifyUserModalVisible: false,
    // 要修改用户的用户名
    modifyUserName: '',
    // 输入框内容
    inputValue: '',
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
  openAddUserModal = (): any => {
    this.setState({
      addUserModalVisible: true,
    });
  };

  // 关闭添加用户模态框
  closeAddUserModal = (): void => {
    this.setState({
      addUserModalVisible: false,
    });
  };

  // 添加用户信息表单完成事件
  onFinish = (values: any): void => {
    // console.log(values);
    addUser({ username: values.username, password: values.password, role: 'User' })
      .then((result) => {
        // console.log(result);
        if (result.code === 200) {
          /**
           * 添加用户成功后则
           * 弹出提示 '添加成功'
           * 关闭模态框
           * 重新请求所有用户列表，更新页面 state
           */
          message.success('添加成功');
          this.closeAddUserModal();
          this.getList();
        } else {
          message.error('添加失败');
        }
      })
      .catch((error) => console.log(error));
  };

  // 删除处理方法
  delete = (username: string): any => {
    const _this = this;
    // console.log(username);
    Modal.confirm({
      title: '确定删除此用户吗?',
      icon: <ExclamationCircleOutlined />,
      content: '点击确定即删除用户',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 删除用户
        deleteUser(username)
          .then((result) => {
            if (result.code === 200) {
              console.log(result);
              message.success('删除成功');
              // 删除用户后重新请求所有用户列表，更新页面 state
              _this.getList();
            }
          })
          .catch((error) => console.log(error));
      },
    });
  };

  // Input 输入框改变事件
  inputOnchange = (e: any): any => {
    // console.log(e.target.value);
    this.setState({
      inputValue: e.target.value,
    });
  };

  // 打开修改用户密码模态框
  openModifyUserModal = () => {
    this.setState({
      modifyUserModalVisible: true,
    });
  };

  // 关闭修改用户密码模态框
  closeModifyUserModal = () => {
    this.setState({
      modifyUserModalVisible: false,
    });
  };

  // 修改处理方法
  modify = (username: string) => {
    console.log(username);
  };

  // 确认修改用户密码处理事件
  handleModifyUser = () => {
    // console.log(this.state.modifyUserName + ' ' + this.state.inputValue);
    modifyUser({
      username: this.state.modifyUserName,
      password: this.state.inputValue,
      role: 'User',
    })
      .then((result) => {
        if (result.code === 200) {
          /**
           * code === 200 修改成功后
           * 关闭修改用户密码模态框
           * 弹出提示 '密码修改成功'
           */
          this.closeModifyUserModal();
          message.success('密码修改成功');
        }
        // inputValue 重新设置为 ''
        this.setState({
          inputValue: '',
        });
      })
      .catch((error) => console.log(error));
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
                    <Button type="primary" onClick={() => this.openAddUserModal()}>
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
                      key="action"
                      render={(record: any): any => {
                        // console.log(record);
                        return (
                          <Space size="middle">
                            <Button
                              type="primary"
                              icon={<FormOutlined />}
                              onClick={() => {
                                this.setState({
                                  modifyUserName: record.username,
                                });
                                // this.modify(record.username);
                                this.openModifyUserModal();
                              }}
                            >
                              修改密码
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
          visible={this.state.addUserModalVisible}
          title="添加用户"
          // onOk={this.handleOk}
          onCancel={() => {
            this.closeAddUserModal();
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
              key="username"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="username"
                allowClear
              />
            </Form.Item>

            <Form.Item
              key="password"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="password"
                allowClear
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

        {/* 修改用户密码模态框 */}
        <Modal
          visible={this.state.modifyUserModalVisible}
          title="修改用户密码"
          cancelText="取消"
          okText="确认"
          onOk={this.handleModifyUser}
          onCancel={() => {
            this.closeModifyUserModal();
          }}
          bodyStyle={{ padding: '18px 22px' }}
          width={350}
        >
          <Input disabled value={this.state.modifyUserName} prefix={<UserOutlined />} />
          <Input.Password
            style={{ marginTop: '10px' }}
            prefix={<LockOutlined />}
            placeholder="请输入修改后的密码"
            value={this.state.inputValue}
            onChange={this.inputOnchange}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Modal>
      </>
    );
  }
}

export default User;
