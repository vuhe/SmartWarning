package top.vuhe.sw.entity.equipment.vo

import top.vuhe.sw.entity.equipment.StatusColor

/**
 * 实时值数据
 * 用于前端传送
 *
 * @property id          id
 * @property perUnit     单位
 * @property statusName  状态名
 * @property statusColor 状态颜色
 * @property channelName 通道名
 * @property value       值
 */
data class RealTimeVO(
    val id: Int?,
    val perUnit: String?,
    val statusName: String?,
    val statusColor: StatusColor,
    val channelName: String?,
    val value: Double
)
