import React from 'react';
import { Table } from 'antd';

// 模拟电表数据
const dataSource = [
  {
    key: '1',
    time: '8:00',
    leakage: 170,
    temperature: 30,
    electricity: 75,
    voltage: 200,
    power: 13,
  },
  {
    key: '2',
    time: '12:00',
    leakage: 120,
    temperature: 35,
    electricity: 72,
    voltage: 212,
    power: 13,
  },
  {
    key: '3',
    time: '16:00',
    leakage: 150,
    temperature: 37,
    electricity: 75,
    voltage: 220,
    power: 12,
  },
  {
    key: '4',
    time: '22:00',
    leakage: 110,
    temperature: 45,
    electricity: 80,
    voltage: 170,
    power: 14,
  },
];

// 电表表头
const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    // 单位 mA, 阈值 300
    title: '漏电(mA)',
    dataIndex: 'leakage',
    key: 'leakage',
  },
  {
    title: '温度(℃)',
    dataIndex: 'temperature',
    key: 'temperature',
  },
  {
    // 单位 A, 阈值 160
    title: '电流(A)',
    dataIndex: 'electricity',
    key: 'electricity',
  },
  {
    // 单位 V, 阈值 过压264 欠压187
    title: '电压(V)',
    dataIndex: 'voltage',
    key: 'voltage',
  },
  {
    // 单位 KW
    title: '有功功率(KW)',
    dataIndex: 'power',
    key: 'power',
  },
];

/**
 *
 */
class MeterTable extends React.Component<any, any> {
  // state = { :  }
  render() {
    return (
      <>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          // style={{
          //   borderRadius: '2px',
          //   background: '#f8f8f8',
          //   boxShadow: '5px 5px 1px #d5d0d0,-5px -5px 1px #ffffff',
          // }}
        />
      </>
    );
  }
}

export default MeterTable;
