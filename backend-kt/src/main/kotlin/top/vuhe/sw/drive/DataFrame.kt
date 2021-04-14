package top.vuhe.sw.drive

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
