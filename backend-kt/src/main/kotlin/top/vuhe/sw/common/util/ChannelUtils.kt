package top.vuhe.sw.common.util

import top.vuhe.sw.entity.equipment.ElectricInfo

/**
 * 处理电气信息
 *
 * 除实时值外其它值存储至数据库
 * 实时值经过转换直接放入发送队列中
 *
 * @param data 其它信息
 */
@Synchronized
fun handleElectricInfo(data: ElectricInfo) {
    // 处理实时信息
    val realTimeInfo = data.getRealTimeDTO()
    if (realTimeInfo != null) {
        val realTime = beanUtil.channelService.getRealTimeInfo(realTimeInfo)
//        sendToRedisStream(realTime)
        sendToMq(realTime)
    }

    // 处理阈值信息
    val thresholdInfo = data.getThresholdDTO()
    // TODO("阈值信息格式不清楚，暂缓处理")

    // 处理状态信息
    val statusInfo = data.getStatusDTO()
    if (statusInfo != null) {
        beanUtil.channelService.updateStates(statusInfo)
    }
}