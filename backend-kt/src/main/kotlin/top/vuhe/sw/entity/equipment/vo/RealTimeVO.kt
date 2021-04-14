package top.vuhe.sw.entity.equipment.vo

import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableName
import com.fasterxml.jackson.annotation.JsonIgnore
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
@TableName(value = "realtime_view")
data class RealTimeVO(
    @field:JsonIgnore
    val id: Int?,
    val perUnit: String?,
    val statusName: String?,
    val statusColor: StatusColor,
    val channelName: String?,
    @field:TableField(exist = false)
    val value: Double
) {
    constructor(id: Int?, perUnit: String?, statusName: String?, statusColor: StatusColor, channelName: String?) :
            this(id, perUnit, statusName, statusColor, channelName, 0.0)
}
