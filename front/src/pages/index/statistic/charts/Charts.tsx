import React from 'react';
import { Radio, Divider, Input, Space, message } from 'antd';
import MeterTable from './table/MeterTable';
import MeterChart from './chart/MeterChart';
import { getDriveRealtimeDataById } from '@/services/device';
import store from '@/redux/store';
import { addDriveRealtimeActionCreator } from '@/redux/actions/actionCreator';

const { Search } = Input;

export interface ChartsState {
  radioValue: string;
  driveID?: number;
  driveRealtime?: any[];
}

/**
 * title {string} 设备名
 * id: {number} 设备 ID
 */
export interface ChartsProps {
  title: string;
  id: number;
}

// 单个设备页面
class Chart extends React.Component<ChartsProps, ChartsState> {
  state: ChartsState = { radioValue: 'chart' };

  constructor(props: ChartsProps) {
    super(props);
  }

  componentDidMount() {
    this.requestHandleApplicationData();
  }

  // 组件渲染后会执行的数据请求事件
  requestHandleApplicationData = () => {
    const _id = this.props.id;
    getDriveRealtimeDataById(_id)
      .then((result) => {
        switch (result.code) {
          case 200: {
            // console.log(result.data);
            this.setState({ driveRealtime: result.data });
            store.dispatch(
              addDriveRealtimeActionCreator({
                id: _id,
                driveRealtime: result.data,
              }),
            );
            break;
          }
          default: {
            message.error('设备实时数据初始化失败');
            break;
          }
        }
      })
      .catch((error) => {
        message.error('[error] 设备实时数据初始化失败');
        console.log(error);
      });
  };

  // 切换图和表
  radioChangedHandler = (e: any) => {
    this.setState({
      radioValue: e.target.value,
    });
  };

  render() {
    const { title } = this.props;
    // console.log(this.props);

    return (
      <>
        <Space align="center" size="large">
          {title === '总电表数据' ? null : (
            <Radio.Group
              defaultValue={this.state.radioValue}
              size="middle"
              onChange={this.radioChangedHandler}
            >
              <Radio.Button value="chart">折线图</Radio.Button>
              <Radio.Button value="table">原始数据</Radio.Button>
            </Radio.Group>
          )}
          <Search placeholder="input search text" enterButton />
        </Space>
        <Divider orientation="left">{title}</Divider>
        {this.state.radioValue === 'table' ? (
          <MeterTable {...this.props} />
        ) : this.state.driveRealtime ? (
          <MeterChart {...this.props} driveRealtime={this.state.driveRealtime} />
        ) : null}
      </>
    );
  }
}

export default Chart;
