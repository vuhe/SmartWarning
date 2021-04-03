import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Result } from 'antd';

class PageNotFound extends React.Component<any, any> {
  render() {
    const { history } = this.props;
    return (
      <Result
        status="404"
        title="404"
        subTitle="页面未找到"
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.go(-1);
            }}
          >
            Back
          </Button>
        }
      />
    );
  }
}

export default withRouter(PageNotFound);
