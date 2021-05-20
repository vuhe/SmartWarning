import React from 'react';
import { Menu, Row, Col, Affix, Layout } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import SWFooter from '@/components/SWFooter';
import EquipmentsLog from './equipmentsLog/EquipmentsLog';

const { Content } = Layout;

const simulate = [
  {
    title: '15#550',
    icon: ProfileOutlined,
    disabled: false,
  },
  { title: '14#549', icon: ProfileOutlined, disabled: true },
  { title: '14#548', icon: ProfileOutlined, disabled: true },
  { title: '15#551', icon: ProfileOutlined, disabled: true },
];

// 设备日志记录
class DriveLog extends React.Component<any, any> {
  render() {
    return (
      <>
        <Layout>
          <Content style={{ margin: '0 4px 0px 4px' }}>
            <div style={{ padding: 12, background: '#fff', minHeight: 370 }}>
              <Row>
                <Col span={2}>
                  <Affix style={{ position: 'absolute', top: 180, left: 10 }}>
                    <div style={{ width: 72 }}>
                      <Menu
                        defaultSelectedKeys={['15#550']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed
                        inlineIndent={20}
                      >
                        {simulate.map((item) => {
                          return (
                            <Menu.Item
                              key={item.title}
                              icon={<item.icon />}
                              disabled={item.disabled}
                            >
                              {item.title}
                            </Menu.Item>
                          );
                        })}
                      </Menu>
                    </div>
                  </Affix>
                </Col>
                <Col span={22}>
                  <div style={{ width: '100%', marginLeft: '10px' }}>
                    <EquipmentsLog equipmentID="15#550" />
                  </div>
                </Col>
              </Row>
            </div>
          </Content>
          <SWFooter />
        </Layout>
      </>
    );
  }
}

export default DriveLog;
