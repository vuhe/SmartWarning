package top.vuhe.drive;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import top.vuhe.common.channel.BufferChannel;

import javax.annotation.PreDestroy;

/**
 * @author zhuhe
 */
@Slf4j
@Component
@Order(value = 1)
public class NettyServer implements CommandLineRunner {
    @Value("${netty.port}")
    private Integer port;
    private final EventLoopGroup bossGroup = new NioEventLoopGroup();
    private final EventLoopGroup workerGroup = new NioEventLoopGroup();
    private Channel channel;
    @Autowired
    private BufferChannel bufferChannel;

    @Async
    @Override
    public void run(String... args) throws Exception {
        init();
    }

    private void init() throws Exception {
        ServerBootstrap bootstrap = new ServerBootstrap();
        //绑定线程池
        bootstrap.group(bossGroup, workerGroup)
                // 指定使用的channel
                .channel(NioServerSocketChannel.class)
                .childOption(ChannelOption.RCVBUF_ALLOCATOR,
                        new AdaptiveRecvByteBufAllocator(64, 65535, 65535))
                // 绑定客户端连接时候触发操作
                .childHandler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    protected void initChannel(SocketChannel ch) throws Exception {
                        // 客户端触发操作
                        ChannelPipeline line = ch.pipeline();

                        // 换成自己的编解码器
                        line.addLast("decoder", new Decoder());
                        line.addLast("encoder", new Encoder());

                        // 换成自己的处理器
                        line.addLast("handler", new ServerHandler(bufferChannel));
                    }
                });
        log.info("Netty started on port(s): " + port + " (tcp)");
        ChannelFuture channelFuture = bootstrap.bind(port).sync();
        channel = channelFuture.channel();
    }

    @PreDestroy
    public void destroy() {
        if (channel != null) {
            channel.close();
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
            log.info("NettyServer shutdown!");
        }
    }

}
