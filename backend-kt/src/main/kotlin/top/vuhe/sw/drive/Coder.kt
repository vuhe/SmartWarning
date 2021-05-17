package top.vuhe.sw.drive

import io.netty.buffer.ByteBuf
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.ByteToMessageDecoder
import io.netty.handler.codec.MessageToByteEncoder

/**
 * ## 电气设备应答命令
 * 用于整合设备与平台之间的通信
 *
 * @property code 命令
 */
enum class CommandEnum(val code: Byte) {
    /**
     * 平台登录
     */
    // 登录上传
    LOGIN_UP(0x10), LOGIN_RE(0x11),

    /**
     * 心跳上传
     */
    // 心跳上传
    HEARTBEAT_UP(0x20), HEARTBEAT_RE(0x21),

    /**
     * 数据上传
     */
    // 实时值上传
    NOW_VALUE_UP(0x30), NOW_VALUE_RE(0x31),

    // 阀值上传
    THRESHOLD_UP(0x32), THRESHOLD_RE(0x33),

    // 状态值上传
    STATUS_UP(0x34), STATUS_RE(0x35),

    // 系统信息上传
    SYS_INFO_UP(0x36), SYS_INFO_RE(0x37),

    // 断电上传
    POWER_OFF_UP(0x38),

    // 重合闸状态上传
    RECLOSING_STATE_UP(0x39),

    /**
     * 数据查询
     */
    // 查询模块信息
    QUERY_INFO_UP(0x40), QUERY_INFO_RE(0x41),

    // 查询实时值
    QUERY_NOW_UP(0x44), QUERY_NOW_RE(0x45),

    // 查询阀值
    QUERY_THRESHOLD_UP(0x46), QUERY_THRESHOLD_RE(0x47),

    // 查询状态值
    QUERY_STATUS_UP(0x48), QUERY_STATUS_RE(0x49),

    // 查询系统信息
    QUERY_SYS_UP(0x4A), QUERY_SYS_RE(0x4B);

    /**
     * 数据设置、远程控制、远程升级
     * 不开放使用
     */

    companion object {
        fun getCommandByCode(b: Int): CommandEnum {
            for (command in values()) {
                if (command.code.toInt() == b) {
                    return command
                }
            }
            throw IllegalArgumentException("命令错误")
        }

        fun getResponseCode(b: CommandEnum): CommandEnum? {
            return when (b) {
                LOGIN_UP -> LOGIN_RE
                HEARTBEAT_UP -> HEARTBEAT_RE
                NOW_VALUE_UP -> NOW_VALUE_RE
                THRESHOLD_UP -> THRESHOLD_RE
                STATUS_UP -> STATUS_RE
                SYS_INFO_UP -> SYS_INFO_RE
                else -> null
            }
        }
    }
}

/**
 * ## 信息帧
 *
 * 从单片机设备获取的信息帧, 其中包含:
 *
 * 命令数据: 包含 1byte, 是设备控制信息
 *
 * dataInfo: 包含 [0, N]byte，是设备发送的数据
 *
 * @property command  命令
 * @property dataInfo 字节信息
 */
data class DataFrame(
    val command: CommandEnum,
    val dataInfo: List<Byte>
)

/**
 * ## 电气设备解码器
 */
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

/**
 * ## 电气设备编码器
 */
class Encoder : MessageToByteEncoder<CommandEnum>() {
    companion object {
        private const val HEADER_LEN = 5
    }

    override fun encode(ctx: ChannelHandlerContext?, code: CommandEnum, outBuf: ByteBuf) {
        // 使用 EncodeHelper 得到 命令类型 和 dataInfo 的字节码
        val info: ByteArray = encodeMsg(code)
        val send = ByteArray(HEADER_LEN + info.size + 1)

        // 添加帧头
        send[0] = 0x7E
        // 处理帧长
        send[1] = (send.size shr 8 and 0xFF).toByte()
        send[2] = (send.size and 0xFF).toByte()
        // 处理 msgId
        // 默认为 0, 不处理
        // 处理 命令类型 和 dataInfo
        System.arraycopy(info, 0, send, 5, info.size)
        // 处理校验码
        var check: Byte = 0
        for (i in 0 until send.size - 1) {
            check = (check + send[i]).toByte()
        }
        send[send.size - 1] = ((check.toInt().inv() and 0xFF) + 1).toByte()
        outBuf.writeBytes(send)
    }

    private fun encodeMsg(commandType: CommandEnum): ByteArray {
        return if (commandType == CommandEnum.LOGIN_RE) {
            // 登录成功
            byteArrayOf(commandType.code, 0x01)
        } else byteArrayOf(commandType.code)
    }

}