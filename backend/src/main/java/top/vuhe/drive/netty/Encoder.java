package top.vuhe.drive.netty;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToMessageEncoder;

import java.nio.charset.Charset;
import java.util.List;

import static io.netty.buffer.Unpooled.directBuffer;
import static io.netty.buffer.Unpooled.unreleasableBuffer;

/**
 * @author zhuhe
 */
public class Encoder extends MessageToMessageEncoder<CharSequence> {
    private final Charset charset;

    public Encoder() {
        this(Charset.defaultCharset());
    }

    public Encoder(Charset charset) {
        if (charset == null) {
            throw new NullPointerException("charset");
        } else {
            this.charset = charset;
        }

    }

    @Override
    protected void encode(ChannelHandlerContext channelHandlerContext,
                          CharSequence charSequence,
                          List<Object> list) throws Exception {
        if (charSequence.length() != 0) {
            list.add(unreleasableBuffer(
                    directBuffer(charSequence.length())
                            .writeBytes(toBytes(
                                    charSequence.toString()))));
        }
    }

    public static byte[] toBytes(String str) {
        if (str == null || "".equals(str.trim())) {
            return new byte[0];
        }
        byte[] bytes = new byte[str.length() / 2];
        for (int i = 0; i < str.length() / 2; i++) {
            String subStr = str.substring(i * 2, i * 2 + 2);
            bytes[i] = (byte) Integer.parseInt(subStr, 16);
        }
        return bytes;
    }
}
