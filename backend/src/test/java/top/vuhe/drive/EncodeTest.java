package top.vuhe.drive;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

import java.util.Arrays;

public class EncodeTest extends MessageToByteEncoder<CommandEnum> {
    @Override
    protected void encode(ChannelHandlerContext ctx,
                          CommandEnum msg,
                          ByteBuf out) throws Exception {

        byte[] a = hex2Bytes("7E003100001038363734353930343233373" +
                "033363131383031303131333031303030" +
                "314B454E4B4F4E5F544543483230D4");
        System.err.println(Arrays.toString(a));
        out.writeBytes(a);
    }

    public static byte[] hex2Bytes(String str) {
        byte[] byteArray = new byte[str.length() / 2];
        for (int i = 0; i < byteArray.length; i++){
            String subStr = str.substring(2 * i, 2 * i + 2);
            byteArray[i] = ((byte)Integer.parseInt(subStr, 16));
        }
        return byteArray;
    }
}
