import { PieConfig } from '@ant-design/charts/es/pie';

// 模拟风险图数据
export const riskData: { data: string; risk: number }[] = [
  {
    data: '0:00',
    risk: 12,
  },
  {
    data: '0:30',
    risk: 12.2,
  },
  {
    data: '1:00',
    risk: 13,
  },
  {
    data: '1:30',
    risk: 13.6,
  },
  {
    data: '2:00',
    risk: 14,
  },
  {
    data: '2:30',
    risk: 12,
  },
  {
    data: '3:00',
    risk: 11,
  },
  {
    data: '3:30',
    risk: 14,
  },
  {
    data: '4:00',
    risk: 16,
  },
  {
    data: '4:30',
    risk: 11,
  },
  {
    data: '5:00',
    risk: 7,
  },
  {
    data: '5:30',
    risk: 5.5,
  },
  {
    data: '6:00',
    risk: 5,
  },
  {
    data: '6:30',
    risk: 4,
  },
  {
    data: '7:00',
    risk: 6,
  },
  {
    data: '7:30',
    risk: 7.5,
  },
  {
    data: '8:00',
    risk: 8,
  },
  {
    data: '8:30',
    risk: 9,
  },
  {
    data: '9:00',
    risk: 12,
  },
  {
    data: '10:00',
    risk: 13,
  },
  {
    data: '11:00',
    risk: 15,
  },
  {
    data: '12:00',
    risk: 11,
  },
  {
    data: '13:00',
    risk: 10,
  },
  {
    data: '14:00',
    risk: 10,
  },
  {
    data: '15:00',
    risk: 11,
  },
  {
    data: '16:00',
    risk: 15,
  },
  {
    data: '17:00',
    risk: 16,
  },
  {
    data: '18:00',
    risk: 16,
  },
  {
    data: '19:00',
    risk: 17,
  },
  {
    data: '20:00',
    risk: 11,
  },
  {
    data: '21:00',
    risk: 5,
  },
  {
    data: '22:00',
    risk: 4,
  },
  {
    data: '23:00',
    risk: 6,
  },
  {
    data: '24:00',
    risk: 9,
  },
];

export const meterData: { name: string; time: string; value: number }[] = [
  {
    name: '电表一',
    time: '8:00',
    value: 43,
  },
  {
    name: '电表一',
    time: '12:00',
    value: 42,
  },
  {
    name: '电表一',
    time: '16:00',
    value: 40,
  },
  {
    name: '电表一',
    time: '22:00',
    value: 44,
  },
  {
    name: '电表二',
    time: '8:00',
    value: 40,
  },
  {
    name: '电表二',
    time: '12:00',
    value: 35,
  },
  {
    name: '电表二',
    time: '16:00',
    value: 38,
  },
  {
    name: '电表二',
    time: '22:00',
    value: 43,
  },
];

// 风险图页面数据 config
export const riskDataConfig: any = {
  data: riskData,
  padding: 'auto',
  xField: 'data',
  yField: 'risk',
  xAxis: { tickCount: 5 },
  // slider: {
  //   start: 0,
  //   end: 0.5,
  // },
};

// 总电表数据页面数据 config
export const allMeterConfig: any = {
  theme: 'default',
  data: meterData,
  padding: 'auto',
  xField: 'time',
  yField: 'value',
  seriesField: 'name',
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

// 设备统计饼状图配置模拟信息
export const pieConfig: PieConfig = {
  appendPadding: 10,
  data: [
    {
      type: '正常',
      value: 950,
    },
    {
      type: '警告',
      value: 52,
    },
    {
      type: '故障',
      value: 18,
    },
  ],
  angleField: 'value',
  colorField: 'type',
  color: ({ type }): string => {
    let returnColor;
    switch (type) {
      case '正常':
        returnColor = '#87d068';
        break;
      case '警告':
        returnColor = 'yellow';
        break;
      case '故障':
        returnColor = '#f50';
        break;
      default:
        returnColor = 'grey';
        break;
    }
    return returnColor;
  },
  radius: 1,
  innerRadius: 0.64,
  meta: {
    value: {
      formatter: function formatter(num: string) {
        return ''.concat(num, ' 台');
      },
    },
  },
  label: {
    type: 'inner',
    offset: '-50%',
    content: '{value}',
    style: {
      textAlign: 'center',
      fontColor: 'black',
      fontSize: 14,
    },
    autoRotate: false,
  },
  interactions: [
    { type: 'element-selected' },
    { type: 'element-active' },
    { type: 'pie-statistic-active' },
  ],
};
