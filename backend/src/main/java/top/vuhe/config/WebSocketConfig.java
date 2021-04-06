package top.vuhe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * @author zhuhe
 */
public class WebSocketConfig {
    /**
     * 注入一个 ServerEndpointExporter,
     * 该 Bean 会自动注册使用 @ServerEndpoint 注解
     * 申明的 websocket endpoint
     */
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
