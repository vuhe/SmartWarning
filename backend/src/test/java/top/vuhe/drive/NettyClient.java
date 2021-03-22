package top.vuhe.drive;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;

public class NettyClient {
    public void start() {
        EventLoopGroup group = new NioEventLoopGroup();
        Bootstrap bootstrap = new Bootstrap()
                .group(group)
                //该参数的作用就是禁止使用Nagle算法，使用于小数据即时传输
                .option(ChannelOption.TCP_NODELAY, true)
                .channel(NioSocketChannel.class)
                .handler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    protected void initChannel(SocketChannel ch) throws Exception {
                        // 客户端触发操作
                        ChannelPipeline line = ch.pipeline();
                        // 换成自己的编解码器
                        line.addLast("decoder", new Decoder());
                        line.addLast("encoder", new EncodeTest());

                        // 换成自己的处理器
                        line.addLast("handler", new NettyClientHandler());
                    }
                });

        try {
            ChannelFuture future = bootstrap.connect("127.0.0.1", 9001).sync();
            System.err.println("客户端连接成功....");
            //发送消息
            future.channel().writeAndFlush(CommandEnum.HEARTBEAT_RE);
            //对关闭通道进行监听
            future.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            group.shutdownGracefully();
        }
    }
}
