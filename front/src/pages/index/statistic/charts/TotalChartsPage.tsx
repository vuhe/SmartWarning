import React from 'react';
import { Radio, Space, message } from 'antd';
import RiskChart from './risk/RiskChart';
import MeterChart from './chart/MeterChart';
import { getDriveRiskFactor } from '@/services/device';
import store from '@/redux/store';
import { changeDrivesRiskFactorActionCreator } from '@/redux/actions/actionCreator';
// const { Search } = Input;

export interface ChartsState {
  radioValue: string;
  drivesRiskFactor: any[];
}

// TotalChartsPage页面
class TotalChartsPage extends React.Component<any, ChartsState> {
  state: ChartsState = { radioValue: 'metersChart', drivesRiskFactor: [] };

  constructor(props: any) {
    super(props);
    this.state.drivesRiskFactor = store.getState().drivesRiskFactor || [];
    // 订阅 Redux 的状态
    store.subscribe(this.storeChange);
  }

  // 状态改变
  storeChange = () => {
    // 只订阅 store 中 drivesRiskFactor 的状态
    this.setState({ drivesRiskFactor: store.getState().drivesRiskFactor });
  };

  componentDidMount() {
    this.requestHandleApplicationData();
    // if (this.state.drivesRiskFactor == []) {
    //   console.log('if (this.state.drivesRiskFactor === [])');
    //   this.requestHandleApplicationData();
    // }
    // console.log(this.state.drivesRiskFactor);
  }

  // 组件渲染后会执行的数据请求事件
  requestHandleApplicationData = () => {
    // 请求设备风险信息
    getDriveRiskFactor()
      .then((result) => {
        switch (result.code) {
          case 200: {
            // console.log(result.data);
            store.dispatch(changeDrivesRiskFactorActionCreator(result.data));
            this.setState({ drivesRiskFactor: result.data });
            break;
          }
          default: {
            message.error('设备基本信息初始化失败');
            break;
          }
        }
      })
      .catch((error) => {
        message.error('[error] 设备风险信息初始化失败');
        console.log(error);
      });
  };

  // 切换 Radio.Group 电表图和今日风险图
  radioChangedHandler = (e: any) => {
    this.setState({
      radioValue: e.target.value,
    });
  };

  render() {
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
        {this.state.radioValue === 'metersChart' ? (
          <MeterChart {...this.props} drivesRiskFactor={this.state.drivesRiskFactor} />
        ) : (
          <RiskChart />
        )}
      </>
    );
  }
}

export default TotalChartsPage;
