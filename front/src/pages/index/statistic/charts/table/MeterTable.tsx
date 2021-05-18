import React from 'react';
import { Table } from 'antd';
import { meterDataSource } from '@/utils/simulate/meter/meterConfig';

// 电表表头
const columns: any[] = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    fixed: 'left',
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
    // 单位 °,
    title: '电流相位角(°)',
    key: '电流相位角',
    children: [
      { title: 'A相', dataIndex: 'A相电流相位角', key: 'A相电流相位角' },
      { title: 'B相', dataIndex: 'B相电流相位角', key: 'B相电流相位角' },
      { title: 'C相', dataIndex: 'C相电流相位角', key: 'C相电流相位角' },
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
    // 单位 °,
    title: '电压相位角(°)',
    key: '电压相位角',
    children: [
      { title: 'A相', dataIndex: 'A相电压相位角', key: 'A相电压相位角' },
      { title: 'B相', dataIndex: 'B相电压相位角', key: 'B相电压相位角' },
      { title: 'C相', dataIndex: 'C相电压相位角', key: 'C相电压相位角' },
    ],
  },
  {
    // 单位 Hz,
    title: '频率(Hz)',
    key: '频率',
    children: [
      { title: 'A相', dataIndex: 'A相频率', key: 'A相频率' },
      { title: 'B相', dataIndex: 'B相频率', key: 'B相频率' },
      { title: 'C相', dataIndex: 'C相频率', key: 'C相频率' },
    ],
  },
  {
    // 单位 %,
    title: '功率因素(%)',
    key: '功率因素',
    children: [
      { title: 'A相', dataIndex: 'A相功率因素', key: 'A相功率因素' },
      { title: 'B相', dataIndex: 'B相功率因素', key: 'B相功率因素' },
      { title: 'C相', dataIndex: 'C相功率因素', key: 'C相功率因素' },
      { title: '合相', dataIndex: '合相功率因素', key: '合相功率因素' },
    ],
  },
  {
    // 单位 KW
    title: '有功功率(KW)',
    key: '有功功率',
    children: [
      { title: 'A相', dataIndex: 'A相有功功率', key: 'A相有功功率' },
      { title: 'B相', dataIndex: 'B相有功功率', key: 'B相有功功率' },
      { title: 'C相', dataIndex: 'C相有功功率', key: 'C相有功功率' },
      { title: '合相', dataIndex: '合相有功功率', key: '合相有功功率' },
    ],
  },
  {
    // 单位 KVar
    title: '无功功率(KVar)',
    key: '无功功率',
    children: [
      { title: 'A相', dataIndex: 'A相无功功率', key: 'A相无功功率' },
      { title: 'B相', dataIndex: 'B相无功功率', key: 'B相无功功率' },
      { title: 'C相', dataIndex: 'C相无功功率', key: 'C相无功功率' },
      { title: '合相', dataIndex: '合相无功功率', key: '合相无功功率' },
    ],
  },
  {
    // 单位 KVA
    title: '视在功率(KVA)',
    key: '视在功率',
    children: [
      { title: 'A相', dataIndex: 'A相视在功率', key: 'A相视在功率' },
      { title: 'B相', dataIndex: 'B相视在功率', key: 'B相视在功率' },
      { title: 'C相', dataIndex: 'C相视在功率', key: 'C相视在功率' },
      { title: '合相', dataIndex: '合相视在功率', key: '合相视在功率' },
    ],
  },
  {
    // 单位 KWH
    title: '有功电能(KWH)',
    key: '有功电能',
    children: [
      { title: 'A相', dataIndex: 'A相有功电能', key: 'A相有功电能' },
      { title: 'B相', dataIndex: 'B相有功电能', key: 'B相有功电能' },
      { title: 'C相', dataIndex: 'C相有功电能', key: 'C相有功电能' },
      { title: '合相', dataIndex: '合相有功电能', key: '合相有功电能' },
    ],
  },
  {
    // 单位 KVarH
    title: '无功电能(KVarH)',
    key: '无功电能',
    children: [
      { title: 'A相', dataIndex: 'A相无功电能', key: 'A相无功电能' },
      { title: 'B相', dataIndex: 'B相无功电能', key: 'B相无功电能' },
      { title: 'C相', dataIndex: 'C相无功电能', key: 'C相无功电能' },
      { title: '合相', dataIndex: '合相无功电能', key: '合相无功电能' },
    ],
  },
  {
    // 单位 KVAH
    title: '视在电能(KVarH)',
    key: '视在电能',
    children: [
      { title: 'A相', dataIndex: 'A相视在电能', key: 'A相视在电能' },
      { title: 'B相', dataIndex: 'B相视在电能', key: 'B相视在电能' },
      { title: 'C相', dataIndex: 'C相视在电能', key: 'C相视在电能' },
      { title: '合相', dataIndex: '合相视在电能', key: '合相视在电能' },
    ],
  },
  {
    // 单位 %
    title: '三相电流平衡度(%)',
    key: '三相电流平衡度',
    dataIndex: '三相电流平衡度',
  },
  {
    // 单位 %
    title: '三相电压平衡度(%)',
    key: '三相电压平衡度',
    dataIndex: '三相电压平衡度',
  },
  {
    // 单位 强度
    title: '信号强度(强度)',
    key: '信号强度',
    dataIndex: '信号强度',
    fixed: 'right',
  },
];

// 要求传入固定格式的 dataSource
interface tableDataSource {}

// 显示原始数据表格组件
const MeterTable = (props: tableDataSource) => {
  console.log(props);

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
      />
    </>
  );
};

export default MeterTable;
