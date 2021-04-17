package top.vuhe.sw.common.util

import org.springframework.amqp.rabbit.connection.CorrelationData
import org.springframework.amqp.rabbit.core.RabbitTemplate
import java.util.*

const val mqExchange = "sw_exchange"
const val realtimeQue = "realtime_queue"
const val realtimeRoutingKey = "realtime_info"

val confirmCallback = RabbitTemplate.ConfirmCallback { data: CorrelationData?, ack: Boolean, cause: String? ->
    utilLog.info("correlation data: $data , ack: $ack")
    if (ack.not()) {
        utilLog.error(cause)
    } else {
        utilLog.info("成功推送")
    }
}

@Throws(Exception::class)
fun sendToMq(message: Any) {
    val info = toJson(message)
    beanUtil.rabbitTemplate.setConfirmCallback(confirmCallback)
    // 保证全局唯一 ，这个是实际消息的ID
    // 在做补偿性机制的时候通过ID来获取到这条消息进行重发
    val correlationData = CorrelationData(UUID.randomUUID().toString())
    // exchange, routingKey, object, correlationData
    beanUtil.rabbitTemplate.convertAndSend(mqExchange, realtimeRoutingKey, info, correlationData)
}
