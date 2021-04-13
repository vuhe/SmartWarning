package top.vuhe.sw.portal.controller

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.common.channel.ConnectListener
import top.vuhe.sw.common.util.toJson
import java.util.concurrent.ConcurrentHashMap
import javax.websocket.*
import javax.websocket.server.ServerEndpoint

@Component
@ServerEndpoint(value = "/websocket")
class WebSocketController {
    companion object {
        private val log = LoggerFactory.getLogger(WebSocketController::class.java)
    }

    /**
     * 存放所有在线的客户端
     */
    private val clients: MutableMap<String, Session> = ConcurrentHashMap()

    /**
     * 监听器
     *
     * 用于在有连接时调用
     */
    var listener: ConnectListener? = null

    /**
     * 连接建立成功调用的方法
     */
    @OnOpen
    fun onOpen(session: Session) {
        log.info("websocket ${session.id} 已连接")
        // 记录客户端信息
        clients[session.id] = session
        // 激活连接监听器
        // 每次都会调用
        listener?.processing()
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    fun onClose(session: Session) {
        // 删除客户端信息
        clients.remove(session.id)
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     */
    @OnMessage
    fun onMessage(message: String?, session: Session?) {
        // 不处理客户端发送的信息
    }

    /**
     * 错误处理
     */
    @OnError
    fun onError(session: Session?, error: Throwable?) {
        log.error("发生错误", error)
    }

    /**
     * 向前端群发消息
     * 传入数据为 Api 标准信息格式
     *
     * @param message json 消息内容
     */
    fun sendMessage(message: ApiResponse<*>) {
        // 给所有客户端发信息
        for ((_, toSession) in clients) {
            // 发送信息
            toSession.asyncRemote.sendText(toJson(message))
        }
    }

    /**
     * 此函数用于判断
     * 是否还有客户端连接
     *
     * @return 是否有连接
     */
    fun hasConnection(): Boolean {
        return clients.isNotEmpty()
    }
}