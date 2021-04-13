package top.vuhe.sw.drive

data class DataFrame(
    val command: CommandEnum,
    val dataInfo: List<Byte>
)
