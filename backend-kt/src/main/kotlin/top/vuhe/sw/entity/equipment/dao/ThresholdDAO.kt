package top.vuhe.sw.entity.equipment.dao

/**
 * 阈值信息
 * 对应数据库中的表
 *
 * @property id             id
 * @property channelId      通道id
 * @property statusId       状态id
 * @property thresholdValue 阈值
 */
data class ThresholdDAO(
    val id: Int?,
    val channelId: Int?,
    val statusId: Int?,
    val thresholdValue: Int?,
)
