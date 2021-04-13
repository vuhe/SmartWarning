package top.vuhe.sw.common.channel

/**
 * ## 连接监听器
 * 用于监听客户端是否连接
 *
 * @author vuhe
 */
fun interface ConnectListener {
    /**
     * 用于处理连接之后的事情
     */
    fun processing()
}