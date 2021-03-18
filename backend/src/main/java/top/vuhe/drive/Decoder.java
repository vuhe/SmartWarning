package top.vuhe.drive;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import lombok.extern.slf4j.Slf4j;
import top.vuhe.drive.plc.PlcInfoFrame;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhuhe
 */
@Slf4j
public class Decoder extends ByteToMessageDecoder {
    /**
     * 数据包最小长度（无 data info)
     */
    private static final int BASE_LENGTH = 7;
    private static final int FRAME_HEADER_LEN = 1;
    private static final int FRAME_LENGTH = 2;
    private static final int MSG_ID = 2;
    private static final int COMMAND_TYPE_LEN = 1;
    private static final int CHECK_CODE_LEN = 1;
    private byte checkCode;
    private int beginIdx;

    @Override
    protected void decode(ChannelHandlerContext channelHandlerContext,
                          ByteBuf in,
                          List<Object> list) throws Exception {
        // 基础长度不足，我们设定基础长度为7
        if (in.readableBytes() < BASE_LENGTH) {
            return;
        }
        // 如果找到开始位置
        if (findStart(in)) {
            // 剩余长度不足可读取数量[没有内容长度位]
            if (in.readableBytes() < BASE_LENGTH - 1) {
                in.readerIndex(beginIdx);
                return;
            }
            checkCode = 0x7E;
            // 读取帧长(2 byte) 并计算 dataInfo 长度
            int dataInfoLen = getValue(in, 2) - BASE_LENGTH;
            // 剩余长度不足可读取数量[没有内容长度位]
            if (in.readableBytes() < dataInfoLen +
                    MSG_ID + COMMAND_TYPE_LEN + CHECK_CODE_LEN) {
                in.readerIndex(beginIdx);
                return;
            }
            // 读取 msgId(2 byte)
            int msgId = getValue(in, 2);
            // 读取命令类型(1 byte)
            int commandType = getValue(in, 1);
            // 读取 dataInfo(N byte)
            List<Byte> dataInfo = getByteArray(in, dataInfoLen);
            // 检查校验和(1 byte)
            byte check = in.readByte();
            // 如果信息无误
            if (check == (~checkCode + 1)) {
                // 对信息进行解码
                list.add(new PlcInfoFrame(commandType, dataInfo));
            }
        }
    }

    private boolean findStart(ByteBuf in) {
        while (true) {
            // 获取包头开始的index
            beginIdx = in.readerIndex();
            // 标记包头开始的index
            in.markReaderIndex();
            // 读到了协议的开始标志，结束while循环
            if (in.readByte() == 0x7E) {
                return true;
            }
            // 未读到包头，略过一个字节
            // 每次略过，一个字节，去读取，包头信息的开始标记
            in.resetReaderIndex();
            in.readByte();
            // 当略过，一个字节之后，
            // 数据包的长度，又变得不满足
            // 此时，应该结束。等待后面的数据到达
            if (in.readableBytes() < BASE_LENGTH) {
                return false;
            }
        }
    }

    private int getValue(ByteBuf in, int byteNum) {
        // 预处理生成数组
        byte[] bytes = new byte[4];
        for (int i = bytes.length - byteNum; i < bytes.length; i++) {
            byte b = in.readByte();
            checkCode += b;
            bytes[i] = b;
        }
        // 获取值
        int value = 0;
        for (int i = 0; i < bytes.length; i++) {
            int shift = (3 - i) * 8;
            value += (bytes[i] & 0xFF) << shift;
        }
        return value;
    }

    private List<Byte> getByteArray(ByteBuf in, int byteNum) {
        List<Byte> data = new ArrayList<>(byteNum + 1);
        for (int i = 0; i < byteNum; i++) {
            byte b = in.readByte();
            checkCode += b;
            data.add(b);
        }
        return data;
    }
}
