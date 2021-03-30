import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import { get } from '@/utils/request';
import { riskData } from '@/utils/simulatedData';

/** 今日风险图 */
class Risk extends React.Component<any, any> {
  state = { data: [] };

  /**
   * 请求表格数据
   */
  getChartData = (callback?: any): void => {
    get('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response: any) => {
        this.setState({
          data: response.data,
        });
        callback && callback();
        return null;
      })
      .catch((error) => {
        console.log('get data failed', error);
      });
  };

  /**
   * 生命周期函数
   * 组件加载完成后执行
   */
  componentDidMount = () => {
    // this.getChartData(() => console.log(this.state));
    this.setState({
      data: riskData,
    });
  };

  render() {
    const config: any = {
      data: this.state.data,
      padding: 'auto',
      xField: 'data',
      yField: 'risk',
      xAxis: { tickCount: 5 },
      slider: {
        start: 0,
        end: 0.8,
      },
    };
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
          <Line {...config} />
        </Card>
      </>
    );
  }
}

export default Risk;
