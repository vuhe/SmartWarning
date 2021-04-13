package top.vuhe.sw.common.channel

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.vo.RealTimeVO
import top.vuhe.sw.portal.controller.WebSocketController
import java.util.concurrent.BlockingQueue
import java.util.concurrent.LinkedBlockingQueue
import javax.annotation.PostConstruct

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
    /**
     * 用于缓存实时信息
     */
    private val realTimeQueue: BlockingQueue<List<RealTimeVO>> = LinkedBlockingQueue()

    @Autowired
    private lateinit var webSocketController: WebSocketController

    @PostConstruct
    fun initListener() {
        // 注册监听器
        webSocketController.listener = ConnectListener { sendToFront() }
    }

    /**
     * 处理电气信息
     *
     * 除实时值外其它值存储至数据库
     * 实时值经过转换直接放入发送队列中
     *
     * @param data 其它信息
     */
    @Synchronized
    fun offer(data: ElectricInfo?) {
        if (data == null) {
            return
        }
        // TODO("存储到数据库")
    }

    @Synchronized
    fun sendToFront() {
        // 有客户端连接且实时值非空
        // 此时发送队列数据
        while (webSocketController.hasConnection() &&
            !realTimeQueue.isEmpty()
        ) {
            // 获取实时值信息
            val data = realTimeQueue.poll()
            // 转换为标准 Api 应答信息
            val jsonData = ApiResponse.ofSuccessWithDate(data)
            // 发送 json 信息
            webSocketController.sendMessage(jsonData)
        }
    }
}