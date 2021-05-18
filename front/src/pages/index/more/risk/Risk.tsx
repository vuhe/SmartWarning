import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/charts';
// import { get } from '@/utils/request';
import { riskAreaConfig } from '@/utils/simulate/riskConfig';
// import { testLineConfig } from '@/utils/simulate/meter/test/testLineConfig';

/** 今日风险图 */
class Risk extends React.Component<any, any> {
  state = { data: [] };

  // /**
  //  * 请求表格数据
  //  */
  // getChartData = (callback?: any): void => {
  //   get('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  //     .then((response: any) => {
  //       this.setState({
  //         data: response.data,
  //       });
  //       callback && callback();
  //       return null;
  //     })
  //     .catch((error) => {
  //       console.log('get data failed', error);
  //     });
  // };

  /**
   * 生命周期函数
   * 组件加载完成后执行
   */
  // componentDidMount = () => {
  //   // this.getChartData(() => console.log(this.state));
  // };

  render() {
    return (
      <>
        <Card
          bordered
          style={{ width: '100%' }}
          title={<Typography.Title level={3}>今日风险系数图</Typography.Title>}
          extra={
            <Card hoverable bodyStyle={{ padding: '2px 4px' }}>
              <Statistic
                title="今日风险系数(较昨日)"
                value={1.2}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          }
        >
          {/* <Line {...riskDataConfig} /> */}
          <Area {...riskAreaConfig} />
        </Card>
      </>
    );
  }
}

export default Risk;
