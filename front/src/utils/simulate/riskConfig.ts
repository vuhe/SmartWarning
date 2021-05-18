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
    risk: 14.5,
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
    risk: 5.3,
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
    risk: 12.5,
  },
  {
    data: '17:00',
    risk: 13.5,
  },
  {
    data: '18:00',
    risk: 12,
  },
  {
    data: '19:00',
    risk: 13,
  },
  {
    data: '20:00',
    risk: 11,
  },
  {
    data: '21:00',
    risk: 10,
  },
  {
    data: '22:00',
    risk: 14,
  },
  {
    data: '23:00',
    risk: 16,
  },
  {
    data: '24:00',
    risk: 19,
  },
];

// 风险图页面数据 config
export const riskDataConfig: any = {
  data: riskData,
  padding: 'auto',
  xField: 'data',
  yField: 'risk',
  xAxis: { tickCount: 5 },
  slider: {
    start: 0,
    end: 0.8,
  },
  smooth: true,
};

// 风险图页面数据 config
export const riskAreaConfig: any = {
  data: riskData,
  xField: 'data',
  yField: 'risk',
  xAxis: { tickCount: 5 },
  // smooth: true,
  // point: {},
  color: '#FF8000',
  areaStyle: function areaStyle() {
    return {
      fill: 'l(270) 0:#FFFFFF 0.5:#F5D0A9 1:#FF8000',
      // color: "#1890ff"
    };
  },
  slider: {
    start: 0,
    end: 0.8,
  },
};
