import { getSimulateLineData } from '@/utils/simulate/meter/simulate';

// 多折线图左侧配置
const dualAxesLeftData = [
  ...getSimulateLineData('温度', 24, 30),
  ...getSimulateLineData('电流', 50, 60),
];

// 多折线图右侧配置
const dualAxesRightData = [
  ...getSimulateLineData('漏电', 0, 10),
  ...getSimulateLineData('电压', 370, 390),
];

// 模拟电表多折线图 config
export const dualAxesConfig = {
  data: [dualAxesLeftData, dualAxesRightData],
  xField: 'time',
  yField: ['value', 'value'],
  slider: {
    start: 0,
    end: 0.5,
  },
  geometryOptions: [
    {
      geometry: 'line',
      seriesField: 'dataName',
      smooth: true,
      // point: {},
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
    },
    {
      geometry: 'line',
      // color: '#5AD8A6',
      seriesField: 'dataName',
      smooth: true,
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
    },
  ],
};

// 模拟电表表格数据
export const meterDataSource = [
  {
    key: '1',
    time: '8:00',
    // 漏电
    leakage: 170,
    // ABC 三相温度
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    // ABC 三相电流
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    // ABC 三相电压
    voltageA: 200,
    voltageB: 210,
    voltageC: 199,
    // 有功功率
    power: 13,
  },
  {
    key: '2',
    time: '10:00',
    leakage: 120,
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    voltageA: 230,
    voltageB: 210,
    voltageC: 211,
    power: 13,
  },
  {
    key: '3',
    time: '12:00',
    leakage: 120,
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    voltageA: 230,
    voltageB: 210,
    voltageC: 211,
    power: 13,
  },
  {
    key: '4',
    time: '14:00',
    leakage: 120,
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    voltageA: 230,
    voltageB: 210,
    voltageC: 211,
    power: 13,
  },
  {
    key: '5',
    time: '16:00',
    leakage: 150,
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    voltageA: 207,
    voltageB: 210,
    voltageC: 219,
    power: 12,
  },
  {
    key: '6',
    time: '18:00',
    leakage: 120,
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    voltageA: 230,
    voltageB: 210,
    voltageC: 211,
    power: 13,
  },
  {
    key: '7',
    time: '20:00',
    leakage: 130,
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    voltageA: 230,
    voltageB: 210,
    voltageC: 211,
    power: 13,
  },
  {
    key: '8',
    time: '22:00',
    leakage: 110,
    temperatureA: 30,
    temperatureB: 27,
    temperatureC: 29,
    electricityA: 75,
    electricityB: 72,
    electricityC: 76,
    voltageA: 240,
    voltageB: 210,
    voltageC: 195,
    power: 14,
  },
];
