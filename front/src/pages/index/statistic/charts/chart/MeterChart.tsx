import React from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/charts';
import { get } from '@/utils/request';
import { riskDataConfig, allMeterConfig } from '@/utils/simulatedData';

class MeterChart extends React.Component<any, any> {
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

  componentDidMount = () => {
    // this.getChartData(() => console.log(this.state));
  };

  render() {
    const { title } = this.props;
    console.log(title);

    // 未引入实际数据，暂时使用模拟数据 config
    const config = title === '总电表数据' || title === '数据页面' ? allMeterConfig : riskDataConfig;

    return (
      <>
        <Card bordered style={{ width: '100%' }} title="chart">
          <Line {...config} />
        </Card>
      </>
    );
  }
}

export default MeterChart;
