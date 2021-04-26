import { PieConfig } from '@ant-design/charts/es/pie';

// 设备统计饼状图配置模拟信息
export const equipmentPieConfig: PieConfig = {
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
