package top.vuhe.sw.drive

import io.netty.channel.ChannelHandlerContext
import io.netty.channel.ChannelInboundHandlerAdapter
import io.netty.util.AttributeKey
import org.slf4j.LoggerFactory
import top.vuhe.sw.drive.CommandEnum.Companion.getResponseCode

/**
 * ## 电气设备服务处理器
 *
 * 用于处理电气设备的信息并进行转发等操作
 */
class ServerHandler : ChannelInboundHandlerAdapter() {
    companion object {
        private val log = LoggerFactory.getLogger(ServerHandler::class.java)
    }

    private val key = AttributeKey.valueOf<Byte>("Id")

    /**
     * channel 通道活跃时回调
     *
     * @param ctx 通道上下文
     */
    override fun channelActive(ctx: ChannelHandlerContext) {
        val channelAttr = ctx.channel().attr(key)
    }

    /**
     * channel 通道不活跃（断开）时回调
     *
     * @param ctx 通道上下文
     */
    override fun channelInactive(ctx: ChannelHandlerContext) {
        log.info("Netty Disconnect Client is :" + ctx.channel().id().asShortText())
        ctx.close()
    }

    /**
     * 读取设备发送过来的信息
     *
     * @param ctx 通道上下文
     * @param msg 设备信息，解码为[DataFrame]
     */
    override fun channelRead(ctx: ChannelHandlerContext, msg: Any) {
        // 取出必要帧信息
        val obj = msg as DataFrame
        // 获取返回请求
        val code: CommandEnum? = getResponseCode(obj.command)
        // 如果有需要回应的信息
        if (code != null) {
            ctx.writeAndFlush(code)
        }
    }

    override fun channelReadComplete(ctx: ChannelHandlerContext) {
        log.info("Netty channel read completed!")
        ctx.flush()
    }

    override fun exceptionCaught(ctx: ChannelHandlerContext, cause: Throwable) {
        log.error(
            "Netty Exception ExceptionCaught :" + ctx.channel().id().asShortText() + " "
                    + cause.message, cause
        )
        ctx.close()
    }
}