package top.vuhe.drive;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

/**
 * @author zhuhe
 */
@Slf4j
class Encoder extends MessageToByteEncoder<CommandEnum> {
    private static final int HEADER_LEN = 5;
    @Override
    protected void encode(ChannelHandlerContext ctx,
                          CommandEnum code,
                          ByteBuf out) throws Exception {
        // 使用 EncodeHelper 得到 命令类型 和 dataInfo 的字节码
        byte[] info = encodeMsg(code);
        byte[] send = new byte[HEADER_LEN + info.length + 1];

        // 添加帧头
        send[0] = 0x7E;
        // 处理帧长
        send[1] = (byte)((send.length >> 8) & 0xFF);
        send[2] = (byte)(send.length & 0xFF);
        // 处理 msgId
        // 默认为 0, 不处理
        // 处理 命令类型 和 dataInfo
        System.arraycopy(info, 0, send, 5, info.length);
        // 处理校验码
        byte check = 0;
        for (int i = 0; i < send.length - 1; i++) {
            check += send[i];
        }
        send[send.length - 1] = (byte) (~check + 1);
        log.info(Arrays.toString(send));
        out.writeBytes(send);
    }

    private static byte[] encodeMsg(CommandEnum commandType) {
        log.info(String.valueOf(commandType.getCode()));
        if (commandType == CommandEnum.LOGIN_RE) {
            // 登录成功
            return new byte[]{commandType.getCode(), 0x01};
        }
        return new byte[]{commandType.getCode()};
    }
}
