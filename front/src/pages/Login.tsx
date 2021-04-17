import React, { CSSProperties } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, Card, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken, setUserInfo } from '../utils/authorize';
import { loginApi } from '../services/authorize';
import { changeUserInfoActionCreator } from '../redux/actionCreator';
import store from '@/redux/store';
// import SWFooter from '@/components/SWFooter';

const { Content } = Layout;
const bg = 'https://vuhe.oss-cn-hangzhou.aliyuncs.com/sw/login_background.jpg';

// 背景样式
const bgImgStyle: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundImage: `url(${bg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
};

// 登录页面
class Login extends React.Component<any, any> {
  onFinish = (values: { username: string; password: string; remember: boolean }) => {
    const { history } = this.props;
    // 登录
    loginApi({
      username: values.username,
      password: values.password,
    })
      .then((result) => {
        // console.log(result);
        switch (result.code) {
          case 200:
            message.success('登录成功');
            const user = {
              username: values.username,
              status: '正常登入使用中',
              type: values.username === 'admin' ? '超级管理员' : '用户',
              authority: values.username === 'admin' ? ['ALL'] : ['NONE'],
            };
            // 本地存储用户信息
            setUserInfo(user);
            // redux 中存储用户信息
            store.dispatch(changeUserInfoActionCreator(user));
            return result.data;
          case 405:
            message.error('登录失败，请检查账号或密码！');
            break;
          default:
            break;
        }
      })
      .then((token) => {
        if (typeof token !== 'undefined') {
          setToken(token);
          history.push('/index/global');
        }
      })
      .catch((err) => {
        message.error('登录失败');
        console.log(err);
      });
  };

  render() {
    return (
      <div style={bgImgStyle}>
        <Content>
          <Row gutter={[32, 32]} style={{ margin: '12px', paddingTop: '96px' }}>
            <Col span={9}></Col>
            <Col span={6}>
              <Card
                title="电气火灾智慧预警平台"
                size="small"
                bordered
                extra={<a>登录</a>}
                style={{
                  width: 380,
                  borderRadius: '8px',
                  background: '#fafafa',
                  boxShadow: '7px 7px 22px #c4c4c4, -7px -7px 22px #ffffff',
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
        </Content>
        {/* <SWFooter />
        test text */}
      </div>
    );
  }
}

export default withRouter(Login);
