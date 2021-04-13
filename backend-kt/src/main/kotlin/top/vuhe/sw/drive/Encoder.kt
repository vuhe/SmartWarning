package top.vuhe.sw.drive

import io.netty.buffer.ByteBuf
import io.netty.channel.ChannelHandlerContext
import io.netty.handler.codec.MessageToByteEncoder
import org.slf4j.LoggerFactory
import kotlin.Byte
import kotlin.ByteArray
import kotlin.byteArrayOf

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