package top.vuhe.drive;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.Attribute;
import io.netty.util.AttributeKey;
import lombok.extern.slf4j.Slf4j;

import static top.vuhe.drive.CommandEnum.*;

/**
 * @author zhuhe
 */
@Slf4j
class ServerHandler extends ChannelInboundHandlerAdapter {
    private final AttributeKey<Byte> key = AttributeKey.valueOf("Id");

    /**
     * channel 通道活跃时回调
     *
     * @param ctx 通道上下文
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        Attribute<Byte> channelAttr = ctx.channel().attr(key);
    }

    /**
     * channel 通道不活跃（断开）时回调
     *
     * @param ctx 通道上下文
     */
    @Override
    public void channelInactive(ChannelHandlerContext ctx) {
        log.info("Netty Disconnect Client is :" + ctx.channel().id().asShortText());
        ctx.close();
    }

    /**
     * 读取设备发送过来的信息
     *
     * @param ctx 通道上下文
     * @param msg 设备信息，解码为{@link DataFrame}
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        log.info(msg.toString());
        // 取出必要帧信息
        DataFrame obj = (DataFrame) msg;
        // 获取返回请求
        CommandEnum code = getResponseCode(obj.getCommand());
        // 如果有需要回应的信息
        if (code != null) {
            ctx.writeAndFlush(code);
        }
        // TODO("将数据转换为通用信息 放入系统通道")
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        log.info("Netty channel read completed!");
        ctx.flush();
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        log.error("Netty Exception ExceptionCaught :" + ctx.channel().id().asShortText() + " "
                + cause.getMessage(), cause);
        ctx.close();
    }
}
