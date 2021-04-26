import React from 'react';
import { Radio, Divider, Input, Space } from 'antd';
import MeterTable from './table/MeterTable';
import MeterChart from './chart/MeterChart';

const { Search } = Input;

export interface ChartsState {
  radioValue: string;
}

/**
 * title {string} 图表的标题
 */
export interface ChartsProps {
  title?: string;
}

/**
 * charts页面
 */
class Charts extends React.Component<ChartsProps, ChartsState> {
  state: ChartsState = { radioValue: 'chart' };

  constructor(props: ChartsProps) {
    super(props);
  }

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
          <Search
            placeholder="input search text"
            enterButton
            // onSearch={() => { }}
          />
        </Space>
        <Divider orientation="left">{title}</Divider>
        {this.state.radioValue === 'table' ? (
          <MeterTable {...this.props} />
        ) : (
          <MeterChart {...this.props} />
        )}
      </>
    );
  }
}

export default Charts;
