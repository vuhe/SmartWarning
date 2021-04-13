package top.vuhe.sw.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.server.standard.ServerEndpointExporter

/**
 * ## WebSocket 配置
 *
 * @author vuhe
 */
@Configuration
@EnableWebSocket
class WebSocketConfig {
    /**
     * 注入一个 ServerEndpointExporter,
     * 该 Bean 会自动注册使用 @ServerEndpoint 注解
     * 申明的 websocket endpoint
     */
    @Bean
    fun serverEndpointExporter(): ServerEndpointExporter {
        return ServerEndpointExporter()
    }
}