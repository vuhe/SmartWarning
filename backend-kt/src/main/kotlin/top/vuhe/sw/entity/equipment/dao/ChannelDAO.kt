package top.vuhe.sw.entity.equipment.dao

/**
 * 通道信息
 * 对应数据库中的表
 *
 * @property id           id
 * @property perUnit      单位
 * @property currentState 当前状态
 * @property channelName  通道名称
 */
data class ChannelDAO(
    val id: Int?,
    val perUnit: String?,
    val currentState: Int,
    val channelName: String?
)
