package top.vuhe.sw.entity.equipment.vo

import top.vuhe.sw.entity.equipment.StatusColor

data class RealTimeVO(
    val id: Int?,
    val perUnit: String?,
    val statusName: String?,
    val statusColor: StatusColor,
    val channelName: String?,
    val value: Double
)
