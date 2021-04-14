package top.vuhe.sw.common.channel

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import top.vuhe.sw.common.util.sendToRedisStream
import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.portal.service.ChannelService

/**
 * ## 缓冲通道
 * 作为设备、前端和数据库的缓冲
 *
 * 用于调平各个数据端的存储速度和间隔
 *
 * @author vuhe
 */
@Component
class BufferChannel {
    companion object {
        private val log = LoggerFactory.getLogger(BufferChannel::class.java)
    }

    @Autowired
    private lateinit var channelService: ChannelService

    /**
     * 处理电气信息
     *
     * 除实时值外其它值存储至数据库
     * 实时值经过转换直接放入发送队列中
     *
     * @param data 其它信息
     */
    @Synchronized
    fun offer(data: ElectricInfo) {
        // 处理实时信息
        val realTimeInfo = data.getRealTimeDTO()
        if (realTimeInfo != null) {
            val realTime = channelService.getRealTimeInfo(realTimeInfo)
            sendToRedisStream(realTime)
        }

        // 处理阈值信息
        val thresholdInfo = data.getThresholdDTO()
        // TODO("阈值信息格式不清楚，暂缓处理")

        // 处理状态信息
        val statusInfo = data.getStatusDTO()
        if (statusInfo != null) {
            channelService.updateStates(statusInfo)
        }
    }
}