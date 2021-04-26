import { getSimulateLineData } from '@/utils/simulate/meter/simulate';

// 总电表数据页面折线图
export const allMeterData: { name: string; time: string; value: number }[] = [
  {
    name: '电表一',
    time: '8:00',
    value: 43,
  },
  {
    name: '电表一',
    time: '10:00',
    value: 44,
  },
  {
    name: '电表一',
    time: '12:00',
    value: 42,
  },
  {
    name: '电表一',
    time: '14:00',
    value: 43,
  },
  {
    name: '电表一',
    time: '16:00',
    value: 40,
  },
  {
    name: '电表一',
    time: '18:00',
    value: 38,
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
    time: '10:00',
    value: 41,
  },
  {
    name: '电表二',
    time: '12:00',
    value: 35,
  },
  {
    name: '电表二',
    time: '14:00',
    value: 45,
  },
  {
    name: '电表二',
    time: '16:00',
    value: 38,
  },
  {
    name: '电表二',
    time: '18:00',
    value: 40,
  },
  {
    name: '电表二',
    time: '22:00',
    value: 43,
  },
];

const all = [...getSimulateLineData('15#550', 8, 12), ...getSimulateLineData('15#551', 6, 9)];

// 总电表数据页面折线图 config
export const allMeterConfig: any = {
  theme: 'default',
  data: all,
  padding: 'auto',
  xField: 'time',
  yField: 'value',
  seriesField: 'dataName',
  smooth: true,
  slider: {
    start: 0,
    end: 0.5,
  },
};
