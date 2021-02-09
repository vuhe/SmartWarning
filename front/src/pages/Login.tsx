import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken } from '../utils/authorize';

class Login extends React.Component<any, any> {
  onFinish = (values: { username: string; password: string; remember: boolean }) => {
    console.log(values.remember);
    const { history } = this.props;
    // 测试使用
    if (values.username === '123' && values.password === '123') {
      history.push('/index/global');
      setToken(values.username);
    } else {
    }
  };

  render() {
    return (
      <>
        <Row gutter={[32, 32]} style={{ margin: '12px', paddingTop: '96px' }}>
          <Col span={9}></Col>
          <Col span={6}>
            <Card title="登录" size="small" bordered style={{ width: 380 }}>
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                style={{ margin: 20 }}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名"
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    allowClear
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                  </Form.Item>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  {/* <span>
                      或者 <a href="">现在注册!</a>
                    </span> */}
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={9}></Col>
        </Row>
      </>
    );
  }
}

export default Login;
