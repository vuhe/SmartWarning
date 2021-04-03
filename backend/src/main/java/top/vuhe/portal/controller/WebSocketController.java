package top.vuhe.portal.controller;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import top.vuhe.common.ApiResponse;
import top.vuhe.common.channel.ConnectListener;
import top.vuhe.common.util.JsonUtils;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 和前端页面连接的 socket
 *
 * @author zhuhe
 */
@Slf4j
@Component
@ServerEndpoint(value = "/websocket")
public class WebSocketController {
    /**
     * 存放所有在线的客户端
     */
    private static final Map<String, Session> CLIENTS = new ConcurrentHashMap<>();
    /**
     * 监听器
     * <p>
     * 用于在有连接时调用
     */
    @Setter
    private ConnectListener listener;

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session) {
        // 记录客户端信息
        CLIENTS.put(session.getId(), session);
        // 激活连接监听器
        // 每次都会调用
        listener.processing();
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        // 删除客户端信息
        CLIENTS.remove(session.getId());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        // 不处理客户端发送的信息
    }

    /**
     * 错误处理
     */
    @OnError
    public void onError(Session session, Throwable error) {
        log.error("发生错误", error);
    }

    /**
     * 向前端群发消息
     * 传入数据为 Api 标准信息格式
     *
     * @param message json 消息内容
     */
    public void sendMessage(ApiResponse<?> message) {
        // 给所以客户端发信息
        for (Map.Entry<String, Session> sessionEntry : CLIENTS.entrySet()) {
            // 获取客户端 session
            Session toSession = sessionEntry.getValue();
            // 发送信息
            toSession.getAsyncRemote().sendText(JsonUtils.toJson(message));
        }
    }

    /**
     * 此函数用于判断
     * 是否还有客户端连接
     *
     * @return 是否有连接
     */
    public boolean hasConnection() {
        return !CLIENTS.isEmpty();
    }
}
