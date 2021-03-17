package top.vuhe.drive.netty;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.DelimiterBasedFrameDecoder;
import lombok.extern.slf4j.Slf4j;

import static top.vuhe.drive.netty.Encoder.toBytes;

/**
 * @author zhuhe
 */
@Slf4j
public class NettyServer {
    private static final NettyServer INSTANCE = new NettyServer();
    /**
     * 将「fffffff」转换成16进制的
     */
    final ByteBuf delimiter = Unpooled.copiedBuffer(toBytes("ffffffff"));
    EventLoopGroup bossGroup = new NioEventLoopGroup();
    EventLoopGroup workerGroup = new NioEventLoopGroup();

    private NettyServer() {
    }

    public static NettyServer getInstance() {
        return INSTANCE;
    }

    public void start(int port) throws Exception {
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
                        log.info("================7.2 报告，有个socket客户端链接到本服务器, IP为：" +
                                ch.localAddress().getHostName() + ", Port为：" +
                                ch.localAddress().getPort() + "========================");
                        // 客户端触发操作
                        ChannelPipeline line = ch.pipeline();

                        // 增加粘包、分包解码器（使用netty自带的）
                        line.addLast("framer", new DelimiterBasedFrameDecoder(2048, delimiter));

                        // 换成自己的编解码器
                        line.addLast("decoder", new Decoder());
                        line.addLast("encoder", new Encoder());

                        // 换成自己的处理器
                        line.addLast("handler", new ServerHandler());
                    }
                });
        ChannelFuture channelFuture = bootstrap.bind(port).sync();
        channelFuture.channel().closeFuture().sync();
    }

    public void destroy() throws Exception {
        bossGroup.shutdownGracefully();
        workerGroup.shutdownGracefully();
        log.info("NettyServer shutdown!");
    }
}
