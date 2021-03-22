package top.vuhe.common.channel;

import top.vuhe.entity.plc.*;

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
public class BufferChannel {
    /**
     * 规定每个信息队列最大长度
     */
    private static final int MAX_SIZE = 5;
    /**
     * 5 种信息队列
     * 用于存储信息
     */
    private static final BlockingQueue<DeviceInfo> DEVICE_QUEUE = new LinkedBlockingQueue<>();
    private static final BlockingQueue<RealTimeInfo> REAL_TIME_QUEUE = new LinkedBlockingQueue<>();
    private static final BlockingQueue<StateInfo> STATE_QUEUE = new LinkedBlockingQueue<>();
    private static final BlockingQueue<SystemInfo> SYSTEM_QUEUE = new LinkedBlockingQueue<>();
    private static final BlockingQueue<ThresholdInfo> THRESHOLD_QUEUE = new LinkedBlockingQueue<>();

    public synchronized void offer(DeviceInfo data) {
        if (DEVICE_QUEUE.size() > MAX_SIZE) {
            DEVICE_QUEUE.poll();
        }
        DEVICE_QUEUE.offer(data);
    }
}
