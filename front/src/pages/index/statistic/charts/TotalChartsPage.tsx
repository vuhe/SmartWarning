import React from 'react';
import { Radio, Divider, Space } from 'antd';
import RiskChart from './risk/RiskChart';
import MeterChart from './chart/MeterChart';

// const { Search } = Input;

export interface ChartsState {
  radioValue: string;
}

/**
 * TotalChartsPage页面
 */
class TotalChartsPage extends React.Component<any, ChartsState> {
  state: ChartsState = { radioValue: 'metersChart' };

  /**
   * 切换图和表
   * @param e {any}
   */
  radioChangedHandler = (e: any) => {
    this.setState({
      radioValue: e.target.value,
    });
  };

  render() {
    const { title } = this.props;
    return (
      <>
        <Space align="center" size="large">
          <Radio.Group
            defaultValue={this.state.radioValue}
            size="middle"
            onChange={this.radioChangedHandler}
          >
            <Radio.Button value="metersChart">总电表数据统计</Radio.Button>
            <Radio.Button value="riskChart">今日风险系数</Radio.Button>
          </Radio.Group>
        </Space>
        <Divider orientation="left">{title}</Divider>
        {this.state.radioValue === 'metersChart' ? <MeterChart {...this.props} /> : <RiskChart />}
      </>
    );
  }
}

export default TotalChartsPage;
