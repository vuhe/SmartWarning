import React from 'react';
import { Button, Result } from 'antd';

export interface PageNotFoundState {
  name?: string;
}

class PageNotFound extends React.Component<any, PageNotFoundState> {
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
            Back Home
          </Button>
        }
      />
    );
  }
}

export default PageNotFound;
