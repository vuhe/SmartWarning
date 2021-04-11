import React from 'react';
import { Layout } from 'antd';
import SWFooter from '@/components/SWFooter';
import { getUserLogs } from '@/services/user';

class UserLog extends React.Component<any, any> {
  state = { userLogs: [] };

  componentDidMount = () => {
    getUserLogs()
      .then((res) => res.data)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <Layout>
          <Layout.Content style={{ margin: '0 4px 0px 4px' }}>
            <div style={{ padding: 16, background: '#fff', minHeight: 370 }}></div>
          </Layout.Content>
        </Layout>
        <SWFooter />
      </>
    );
  }
}

export default UserLog;
