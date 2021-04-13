package top.vuhe.sw.drive

import io.netty.buffer.ByteBuf
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.ByteToMessageDecoder

class Decoder : ByteToMessageDecoder() {
    companion object {
        /**
         * 数据包最小长度（无 data info)
         */
        private const val BASE_LENGTH = 7
        private const val FRAME_HEADER_LEN = 1
        private const val FRAME_LENGTH = 2
        private const val MSG_ID = 2
        private const val COMMAND_TYPE_LEN = 1
        private const val CHECK_CODE_LEN = 1
    }

    private var checkCode = 0
    private var beginIdx = 0

    override fun decode(ctx: ChannelHandlerContext?, inBuf: ByteBuf, list: MutableList<Any>) {
        // 基础长度不足，我们设定基础长度为7
        if (inBuf.readableBytes() < BASE_LENGTH) {
            return
        }
        // 如果找到开始位置
        if (findStart(inBuf)) {
            // 剩余长度不足可读取数量[没有内容长度位]
            if (inBuf.readableBytes() < BASE_LENGTH - 1) {
                inBuf.readerIndex(beginIdx)
                return
            }
            checkCode = 0x7E
            // 读取帧长(2 byte) 并计算 dataInfo 长度
            val dataInfoLen: Int = getValue(inBuf, 2) - BASE_LENGTH
            // 剩余长度不足可读取数量[没有内容长度位]
            if (inBuf.readableBytes() < dataInfoLen +
                MSG_ID + COMMAND_TYPE_LEN + CHECK_CODE_LEN
            ) {
                inBuf.readerIndex(beginIdx)
                return
            }
            // 读取 msgId(2 byte)
            val msgId: Int = getValue(inBuf, 2)
            // 读取命令类型(1 byte)
            val commandType: Int = getValue(inBuf, 1)
            // 读取 dataInfo(N byte)
            val dataInfo: List<Byte> = getByteArray(inBuf, dataInfoLen)
            // 检查校验和(1 byte)
            val check = inBuf.readByte().toInt() and 0xFF
            // 如果信息无误
            if (check == (checkCode.inv() + 1) and 0xFF) {
                // 对信息进行解码
                list.add(
                    DataFrame(
                        CommandEnum.getCommandByCode(commandType),
                        dataInfo
                    )
                )
            }
        }
    }

    private fun findStart(inBuf: ByteBuf): Boolean {
        while (true) {
            // 获取包头开始的index
            beginIdx = inBuf.readerIndex()
            // 标记包头开始的index
            inBuf.markReaderIndex()
            // 读到了协议的开始标志，结束while循环
            if (inBuf.readByte().toInt() == 0x7E) {
                return true
            }
            // 未读到包头，略过一个字节
            // 每次略过，一个字节，去读取，包头信息的开始标记
            inBuf.resetReaderIndex()
            inBuf.readByte()
            // 当略过，一个字节之后，
            // 数据包的长度，又变得不满足
            // 此时，应该结束。等待后面的数据到达
            if (inBuf.readableBytes() < BASE_LENGTH) {
                return false
            }
        }
    }

    private fun getValue(inBuf: ByteBuf, byteNum: Int): Int {
        // 预处理生成数组
        val bytes = ByteArray(4)
        for (i in bytes.size - byteNum until bytes.size) {
            val b = inBuf.readByte()
            checkCode = (checkCode + b) and 0xFF
            bytes[i] = b
        }
        // 获取值
        var value = 0
        for (i in bytes.indices) {
            val shift = (3 - i) * 8
            value += (bytes[i].toInt() and 0xFF) shl shift
        }
        return value
    }

    private fun getByteArray(inBuf: ByteBuf, byteNum: Int): List<Byte> {
        val data: MutableList<Byte> = ArrayList(byteNum + 1)
        for (i in 0 until byteNum) {
            val b = inBuf.readByte()
            checkCode = (checkCode + b) and 0xFF
            data.add(b)
        }
        return data
    }
}