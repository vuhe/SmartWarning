// import { realData } from "./simulate/meter/data/data";

// 表格数据源的数据项
export interface dataEntry {
  key?: any;
  time: string;
  [x: string]: any; // 可以动态添加属性
}

/**
 * 将传入的实时数据添加上时间戳并转化为可用的表格数据源
 * @param data 实时数据数据项
 */
export const realDataToTableDataSource = (data: SmartWarning.meterEntry[]): any => {
  // 时间戳添加：将当前时间就作为数据的实时时间
  const realTime = new Date();
  const _time = `${realTime.getHours()}: ${realTime.getMinutes()}`;
  const temp: dataEntry = { time: _time }; // 先添加上时间戳
  // 动态添加属性（属性名 item.channelName）
  for (const item of data) {
    temp[item.channelName] = item.value;
  }
  return temp;
};

/**
 * 将传入的实时数据添加上时间戳并转化为可用的图表配置项
 * @param data 实时数据数据项数组
 */
// export const realDataToChartConfig = (data: SmartWarning.meterEntry[]): any => {};
