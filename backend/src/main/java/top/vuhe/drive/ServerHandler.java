package top.vuhe.drive;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.Attribute;
import io.netty.util.AttributeKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author zhuhe
 */
@Slf4j
@Service
public class ServerHandler extends ChannelInboundHandlerAdapter {
    private final AttributeKey<Byte> key = AttributeKey.valueOf("Id");

    /**
     * channelAction
     * channel 通道 action 活跃的
     * 当客户端主动链接服务端的链接后，这个通道就是活跃的了。也就是客户端与服务端建立了通信通道并且可以传输数据
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        Attribute<Byte> channelAttr = ctx.channel().attr(key);
        log.info("One Netty client connected!");
    }

    /**
     * channelInactive
     * channel 通道 Inactive 不活跃的
     * 当客户端主动断开服务端的链接后，这个通道就是不活跃的。也就是说客户端与服务端的关闭了通信通道并且不可以传输数据
     *
     * @param ctx
     */
    @Override
    public void channelInactive(ChannelHandlerContext ctx) {
        log.info("Netty Disconnect Client IP is :" + ctx.channel().id().asShortText() + " "
                + ctx.channel().remoteAddress());
        ctx.close();
    }

    /**
     * 功能：读取服务器发送过来的信息
     *
     * @param ctx
     * @param msg
     * @throws Exception
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        log.info("Netty read channel message...");
//        ByteBuf buf = (ByteBuf) msg;
//        byte[] req = new byte[buf.readableBytes()];
//        buf.readBytes(req);
//        String body = new String(req, "UTF-8");
//        buf.release();
        log.info("[Netty message: ][" + msg + "]");

//        handleMessage(ctx, body);
    }
//
//    private void handleMessage(ChannelHandlerContext ctx, String body) {
//        log.info("================15. 业务逻辑处理开始========================");
//        MessageContext messageContext = (MessageContext) SpringContext.getBean("messageContext");
//        String code = "201";
//        IMessageService<String> service = messageContext.get(code);
//        String resXml = (String) service.handle(code, "我是接收到的请求报文！！！");
//
//        log.info("================18. 返回给Socket请求客户端的处理结果为：" + resXml + "========================");
//        ctx.writeAndFlush(Unpooled.copiedBuffer(resXml.getBytes()));
//    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        log.info("Netty channel read completed!");
        ctx.flush();
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        log.error("Netty Exception ExceptionCaught :" + ctx.channel().id().asShortText() + " "
                + cause.getMessage(), cause);
        ctx.close();
    }
}
