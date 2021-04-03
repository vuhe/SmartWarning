package top.vuhe.common.channel;

/**
 * 用于监听客户端是否连接
 *
 * @author zhuhe
 */
@FunctionalInterface
public interface ConnectListener {
    /**
     * 用于处理连接之后的事情
     */
    void processing();
}
