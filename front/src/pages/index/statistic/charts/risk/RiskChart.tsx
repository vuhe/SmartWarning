import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/charts';
import { riskAreaConfig } from '@/utils/simulate/riskConfig';

/** 今日风险图 */
class RiskChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // console.log(props);
  }

  render() {
    return (
      <>
        <Card
          bordered
          style={{ width: '100%' }}
          title={<Typography.Title level={4}>今日风险系数图</Typography.Title>}
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

export default RiskChart;
