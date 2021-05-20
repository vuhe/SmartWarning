import React from 'react';
import { Table, Tooltip } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import uuid from '@/utils/uuid';
// import { meterDataSource } from '@/utils/simulate/meter/meterConfig';
// import { realDataToTableDataSource } from "@/utils/realDataUtils";

// 表格数据源的数据项
interface dataEntry {
  time: number;
  list: any[];
  [x: string]: any; // 可以动态添加属性
}

/**
 * 将设备实时数据转化为表格数据源
 * @param driveRealtime
 * @returns
 */
const realDataToTableDataSource = (driveRealtime: dataEntry[]): any => {
  const array = [];
  for (const drive of driveRealtime) {
    const realTime = new Date(drive.date);
    const _time = `${realTime.getHours()}: ${realTime.getMinutes()}`;
    const temp: any = { time: _time, key: uuid() };
    for (const item of drive.list) {
      temp[item.channelName] = item.value;
    }
    array.push(temp);
  }
  return array;
};

// 电表表头
const columns: any[] = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    fixed: 'left',
  },

  {
    title: '温度(℃)',
    key: 'temperature',
    children: [
      { title: 'A相', dataIndex: 'A相温度', key: 'temperatureA' },
      { title: 'B相', dataIndex: 'B相温度', key: 'temperatureB' },
      { title: 'C相', dataIndex: 'C相温度', key: 'temperatureC' },
      { title: 'N相', dataIndex: 'N相温度', key: 'temperatureC' },
    ],
  },
  {
    // 单位 A, 阈值 160
    title: '电流(A)',
    key: 'electricity',
    children: [
      { title: 'A相', dataIndex: 'A相电流', key: 'electricityA' },
      { title: 'B相', dataIndex: 'B相电流', key: 'electricityB' },
      { title: 'C相', dataIndex: 'C相电流', key: 'electricityC' },
    ],
  },
  {
    // 单位 V, 阈值 过压 264 欠压 187
    title: '电压(V)',
    key: 'voltage',
    children: [
      { title: 'A相', dataIndex: 'A相电压', key: 'voltageA' },
      { title: 'B相', dataIndex: 'B相电压', key: 'voltageB' },
      { title: 'C相', dataIndex: 'C相电压', key: 'voltageC' },
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
    // 单位 mA, 阈值 300
    title: '漏电(mA)',
    dataIndex: '漏电',
    key: 'leakage',
    fixed: 'right',
  },
  {
    // 单位 强度
    title: '信号强度(强度)',
    key: '信号强度',
    dataIndex: '信号强度',
    fixed: 'right',
    render: () => {
      return (
        <Tooltip title="设备已联网">
          <WifiOutlined style={{ color: 'blue' }} />
        </Tooltip>
      );
    },
  },
];

// 要求传入固定格式的 dataSource
interface tableDataProps {
  driveRealtime: any;
  [x: string]: any;
}

// 显示原始数据表格组件
const MeterTable = (props: tableDataProps) => {
  const data = realDataToTableDataSource(props.driveRealtime);

  return (
    <>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        scroll={{ x: 1200, y: 400 }}
        pagination={{
          position: ['bottomRight'],
          pageSize: 8,
        }}
      />
    </>
  );
};

export default MeterTable;
