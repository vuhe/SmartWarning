import React, { CSSProperties } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import bgImg from '../../public/login_background.jpg'; // 需要 file-loader
import { setToken } from '../utils/authorize';
// import { loginApi } from '../services/authorize';

// 背景样式
const bgImgStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundImage: `url(${bgImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
};

// 登录页面
class Login extends React.Component<any, any> {
  onFinish = (values: { username: string; password: string; remember: boolean }) => {
    const { history } = this.props;
    // 测试使用
    if (values.username === '123' && values.password === '123') {
      setToken(values.username);
      history.push('/index');
      message.success('登录成功');
    } else {
      message.error('登录失败');
    }

    /**
     * 登录
     */
    // loginApi({
    //   username: values.username,
    //   password: values.password,
    // })
    //   .then((res) => {
    //     message.success('登录成功');
    //     history.push('/index/global');
    //     setToken(values.username);
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     message.error('登录失败');
    //     console.log(err);
    //   });
  };

  render() {
    return (
      <div style={bgImgStyle}>
        <Row gutter={[32, 32]} style={{ margin: '12px', paddingTop: '96px' }}>
          <Col span={9}></Col>
          <Col span={6}>
            <Card
              title="登录"
              size="small"
              bordered
              style={{
                width: 380,
                borderRadius: '8px',
                background: '#fafafa',
                boxShadow: '5px 5px 10px #52b8d5, -5px -5px 10px #70f8ff',
              }}
            >
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
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={9}></Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Login);
