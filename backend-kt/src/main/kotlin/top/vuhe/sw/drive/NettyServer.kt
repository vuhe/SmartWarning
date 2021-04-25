package top.vuhe.sw.drive

import io.netty.bootstrap.ServerBootstrap
import io.netty.channel.*
import io.netty.channel.nio.NioEventLoopGroup
import io.netty.channel.socket.SocketChannel
import io.netty.channel.socket.nio.NioServerSocketChannel
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.CommandLineRunner
import org.springframework.core.annotation.Order
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Component
import javax.annotation.PreDestroy

/**
 * ## 电气设备服务
 *
 * 用于监听电气设备端口并响应
 *
 * @property port 端口
 */
@Component
@Order(value = 1)
class NettyServer(@Value("\${netty.port}") private val port: Int) :
    CommandLineRunner {
    companion object {
        private val log = LoggerFactory.getLogger(NettyServer::class.java)
    }

    private val bossGroup: EventLoopGroup = NioEventLoopGroup()
    private val workerGroup: EventLoopGroup = NioEventLoopGroup()
    private var channel: Channel? = null

    @Async
    @Throws(Exception::class)
    override fun run(vararg args: String?) {
        init()
    }

    @Throws(Exception::class)
    private fun init() {
        val bootstrap = ServerBootstrap()
        //绑定线程池
        bootstrap.group(bossGroup, workerGroup) // 指定使用的channel
            .channel(NioServerSocketChannel::class.java)
            .childOption(
                ChannelOption.RCVBUF_ALLOCATOR,
                AdaptiveRecvByteBufAllocator(64, 65535, 65535)
            ) // 绑定客户端连接时候触发操作
            .childHandler(object : ChannelInitializer<SocketChannel>() {
                @Throws(Exception::class)
                override fun initChannel(ch: SocketChannel) {
                    // 客户端触发操作
                    val line = ch.pipeline()

                    // 换成自己的编解码器
                    line.addLast("decoder", Decoder())
                    line.addLast("encoder", Encoder())

                    // 换成自己的处理器
                    line.addLast("handler", ServerHandler())
                }
            })
        log.info("Netty started on port(s): $port (tcp)")
        val channelFuture = bootstrap.bind(port).sync()
        channel = channelFuture.channel()
    }

    @PreDestroy
    fun destroy() {
        if (channel != null) {
            channel!!.close()
            bossGroup.shutdownGracefully()
            workerGroup.shutdownGracefully()
            log.info("NettyServer shutdown!")
        }
    }
}