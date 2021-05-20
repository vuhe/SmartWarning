import React, { CSSProperties } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, Card, message, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken, setUserInfo } from '../utils/localStorage';
import { login } from '../services/login';
import { getDriveInfo, getDriveLog, getDriveLogsInfo } from '../services/device';
import {
  changeUserInfoActionCreator,
  changeDriveInfoActionCreator,
  changeDrivesLogsActionCreator,
  changeWarningLogsActionCreator,
} from '../redux/actions/actionCreator';
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
  // constructor(props: any) {
  //   super(props);
  //   // 订阅 Redux 的状态
  //   store.subscribe(this.storeChange);
  // }

  // // 状态改变
  // storeChange = () => {
  //   this.setState(store.getState);
  // };

  // 登录成功会执行的数据请求事件
  requestHandleApplicationData = () => {
    // 请求设备基本信息
    getDriveInfo()
      .then((result) => {
        switch (result.code) {
          case 200: {
            store.dispatch(changeDriveInfoActionCreator(result.data));
            break;
          }
          default: {
            message.error('设备基本信息初始化失败');
            break;
          }
        }
      })
      // .then(() => console.log(this.state))
      .catch((error) => {
        message.error('设备基本信息初始化失败');
        console.log(error);
      });

    // 请求设备日志
    getDriveLog()
      .then((result) => {
        switch (result.code) {
          case 200: {
            // console.log(result.data);
            store.dispatch(changeWarningLogsActionCreator(result.data));
            break;
          }
          default: {
            message.error('设备日志信息初始化失败');
            break;
          }
        }
      })
      .catch((error) => {
        message.error('设备日志信息初始化失败');
        console.log(error);
      });

    // 请求设备已处理的日志
    getDriveLogsInfo()
      .then((result) => {
        switch (result.code) {
          case 200: {
            // console.log(result.data);
            store.dispatch(changeDrivesLogsActionCreator(result.data));
            break;
          }
          default: {
            message.error('设备日志信息初始化失败');
            break;
          }
        }
      })
      .catch((error) => {
        message.error('设备日志信息初始化失败');
        console.log(error);
      });
  };

  // 表单完成事件
  onFinish = (values: { username: string; password: string; remember: boolean }) => {
    const { history } = this.props;
    // 登录
    login({
      username: values.username,
      password: values.password,
    })
      .then((result) => {
        // console.log(result);
        switch (result.code) {
          case 200: {
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
          }
          case 405: {
            message.error('登录失败，请检查账号或密码！');
            break;
          }
          default:
            break;
        }
      })
      .then((token) => {
        if (typeof token !== 'undefined') {
          setToken(token);
          history.push('/index/global');
        }
        return null;
      })
      .then(() => {
        this.requestHandleApplicationData();
      })
      .catch((error) => {
        message.error('登录失败');
        console.log(error);
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
      </div>
    );
  }
}

export default withRouter(Login);
