import React from 'react';
import { Table } from 'antd';
import { meterDataSource } from '@/utils/simulatedData';

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
    key: 'temperature',
    children: [
      { title: 'A相', dataIndex: 'temperatureA', key: 'temperatureA' },
      { title: 'B相', dataIndex: 'temperatureB', key: 'temperatureB' },
      { title: 'C相', dataIndex: 'temperatureC', key: 'temperatureC' },
    ],
  },
  {
    // 单位 A, 阈值 160
    title: '电流(A)',
    key: 'electricity',
    children: [
      { title: 'A相', dataIndex: 'electricityA', key: 'electricityA' },
      { title: 'B相', dataIndex: 'electricityB', key: 'electricityB' },
      { title: 'C相', dataIndex: 'electricityC', key: 'electricityC' },
    ],
  },
  {
    // 单位 V, 阈值 过压264 欠压187
    title: '电压(V)',
    key: 'voltage',
    children: [
      { title: 'A相', dataIndex: 'voltageA', key: 'voltageA' },
      { title: 'B相', dataIndex: 'voltageB', key: 'voltageB' },
      { title: 'C相', dataIndex: 'voltageC', key: 'voltageC' },
    ],
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
          dataSource={meterDataSource}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            pageSize: 6,
          }}
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
