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
import { getAllUserList, addUser } from '@/services/user';
import SWFooter from '@/components/SWFooter';

const { Content } = Layout;

class User extends React.Component<any, any> {
  state = {
    visible: false,
    userinfo: {
      type: '超级管理员',
      id: '2018001',
      name: '_lax',
      authority: 'all',
      status: '正常登入使用中',
    },
    userList: [],
    columns: [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户类型',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '权限',
        key: 'authority',
        dataIndex: 'authority',
        render: (tags: any) => (
          <>
            {tags.map((tag: any) => {
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
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: () => (
          <Space size="middle">
            <Button type="primary" icon={<FormOutlined />}>
              修改
            </Button>
            <Button type="primary" danger icon={<CloseCircleOutlined />}>
              删除
            </Button>
          </Space>
        ),
      },
    ],
  };

  componentDidMount = () => {
    this.getList();
  };

  getList = () => {
    // 获取所有用户信息
    getAllUserList()
      .then((res) => res.data)
      .then((result) => {
        if (result.message === 'success') {
          this.setState({
            userList: result.data.map((item: any, index: number) => {
              if (item.role === 'User') item.role = '管理员';
              else item.role = '?';
              item.authority = ['null'];
              item.id = index;
              return item;
            }),
          });
        } else {
          // console.log(result);
          message.error(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onFinish = (values: any) => {
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
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <Layout>
          <Content style={{ margin: '0 4px 0px 4px' }}>
            <div style={{ padding: 16, background: '#fff', minHeight: 370 }}>
              <Descriptions title={<h2>{this.state.userinfo.name}</h2>} bordered>
                <Descriptions.Item label="用户名">{this.state.userinfo.name}</Descriptions.Item>
                <Descriptions.Item label="id">{this.state.userinfo.id}</Descriptions.Item>
                <Descriptions.Item label="用户类型">{this.state.userinfo.type}</Descriptions.Item>
                <Descriptions.Item label="权限" span={2}>
                  {this.state.userinfo.authority}
                </Descriptions.Item>
                <Descriptions.Item label="用户状态" span={1}>
                  {this.state.userinfo.status}
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                  ********************
                  <br />
                  ********************
                </Descriptions.Item>
              </Descriptions>
              <br />
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
                  columns={this.state.columns}
                  dataSource={this.state.userList}
                  pagination={false}
                  style={{
                    marginTop: '20px',
                  }}
                />
              </Card>
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
