import { getSimulateLineData } from '@/utils/simulate/meter/simulate';

const testData = [
  ...getSimulateLineData('温度', 24, 30),
  ...getSimulateLineData('电流', 50, 60),
  ...getSimulateLineData('漏电', 0, 10),
  ...getSimulateLineData('电压', 370, 390),
];

export const testLineConfig: any = {
  data: testData,
  xField: 'time',
  yField: 'value',
  seriesField: 'channelName',
  legend: { position: 'top' },
  smooth: true,
  animation: {
    appear: {
      animation: 'path-in',
      duration: 5000,
    },
  },
};
