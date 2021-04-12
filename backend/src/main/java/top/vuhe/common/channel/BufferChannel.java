package top.vuhe.common.channel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.vuhe.common.ApiResponse;
import top.vuhe.entity.equipment.*;
import top.vuhe.entity.equipment.bo.RealTimeBO;
import top.vuhe.portal.controller.WebSocketController;

import javax.annotation.PostConstruct;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * 缓冲通道
 * <p>
 * 作为设备、设备和数据库的缓冲
 * 用于调平各个数据端的存储速度和间隔
 *
 * @author zhuhe
 */
@Component
public class BufferChannel {
    /**
     * 用于缓存实时信息
     */
    private static final BlockingQueue<RealTimeBO> REAL_TIME_QUEUE = new LinkedBlockingQueue<>();
    @Autowired
    private WebSocketController webSocketController;

    @PostConstruct
    public void initListener() {
        // 注册监听器
        webSocketController.setListener(this::sendToFront);
    }

    /**
     * 「实时值」插入队列函数
     * <p>
     * 仅实时值会立即尝试转发至前端
     *
     * @param data 实时值
     */
    public synchronized void offer(RealTimeBO data) {
        REAL_TIME_QUEUE.offer(data);
        sendToFront();
    }

    /**
     * 其它信息直接处理
     * <p>
     * 其它值直接存储至数据库
     *
     * @param data 其它信息
     */
    public synchronized void offer(PlcInfo data) {
        // TODO("存储到数据库")
    }

    public synchronized void sendToFront() {
        // 有客户端连接且实时值非空
        // 此时发送队列数据
        while (webSocketController.hasConnection() &&
                !REAL_TIME_QUEUE.isEmpty()) {
            // 获取实时值信息
            RealTimeBO data = REAL_TIME_QUEUE.poll();
            // 转换为标准 Api 应答信息
            ApiResponse<RealTimeBO> jsonData = ApiResponse.ofSuccessWithDate(data);
            // 发送 json 信息
            webSocketController.sendMessage(jsonData);
        }
    }
}
