/**
 * 返回一个区间 [min, max] 内的随机数, 四舍五入取整数
 * @param min 区间下限
 * @param max 区间上限
 * @returns 区间 [min, max] 内的随机数
 */
export function getRandomNumber(min: number, max: number): any {
  let result = Math.random() * (max + 1 - min) + min;
  while (result > max) {
    result = Math.random() * (max + 1 - min) + min;
  }
  // 四舍五入取整数
  return Math.floor(result);
  // return result.toFixed(1);
}
