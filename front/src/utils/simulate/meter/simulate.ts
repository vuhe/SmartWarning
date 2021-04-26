import { getRandomNumber } from '@/utils/random';

/**
 * 返回折线图模拟数据数组（具体一项（比如漏电）一天的数据）
 * @param _channelName 数据项名称
 * @param min 数据模拟区间 [min, max] 的下界最小值
 * @param max 数据模拟区间 [min, max] 的上界最大值
 * @returns {SmartWarning.meterEntry[]} 模拟数据数组
 */
export function getSimulateLineData(
  _channelName: string,
  min: number,
  max: number,
): SmartWarning.meterEntry[] {
  const list: SmartWarning.meterEntry[] = [];
  const times = 48; // 模拟一天时间内的数据（半小时一次）
  for (let i = 0; i <= times; i++) {
    list.push({
      time: `${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
      channelName: _channelName,
      value: getRandomNumber(min, max),
    });
  }
  return list;
}
