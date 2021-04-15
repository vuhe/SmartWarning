package top.vuhe.sw.config

import org.springframework.amqp.core.*
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import top.vuhe.sw.common.util.mqExchange
import top.vuhe.sw.common.util.realtimeQue
import top.vuhe.sw.common.util.realtimeRoutingKey

@Configuration
class RabbitmqConfig {
    @Bean(mqExchange)
    fun defaultExchange(): Exchange {
        return ExchangeBuilder
            .topicExchange(mqExchange)
            // 持久化，mq重启之后交换机还在
            .durable(true)
            .build()
    }

    @Bean(realtimeQue)
    fun realtimeQueue(): Queue {
        return Queue(realtimeQue)
    }

    @Bean
    fun realtimeBinding(
        @Qualifier(realtimeQue) queue: Queue,
        @Qualifier(mqExchange) exchange: Exchange
    ): Binding {
        return BindingBuilder
            .bind(queue)
            .to(exchange)
            .with(realtimeRoutingKey)
            .noargs()
    }

}