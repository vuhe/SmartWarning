import React from 'react';
import { Card, Tooltip } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import { Line, DualAxes } from '@ant-design/charts';
// import { get } from '@/utils/request';
import { allMeterConfig } from '@/utils/simulate/meter/allMeterConfig';
import { dualAxesConfig } from '@/utils/simulate/meter/meterConfig';

class MeterChart extends React.Component<any, any> {
  /**
   * 请求表格数据
   */
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

  // componentDidMount = () => {
  //   // this.getChartData(() => console.log(this.state));
  // };

  render() {
    const { title } = this.props;
    // 未引入实际数据，暂时使用模拟数据 config

    // 检查是否为总电表数据页面
    const isAll = title === '总电表数据' || title === '数据页面';

    return (
      <>
        <Card
          bordered
          style={{ width: '100%' }}
          title={isAll ? '各电表风险系数' : '15#550'}
          extra={
            isAll ? (
              <Tooltip title="设备已联网">
                <WifiOutlined style={{ color: 'blue' }} />
              </Tooltip>
            ) : null
          }
        >
          {isAll ? <Line {...allMeterConfig} /> : <DualAxes {...dualAxesConfig} />}
        </Card>
      </>
    );
  }
}

export default MeterChart;
