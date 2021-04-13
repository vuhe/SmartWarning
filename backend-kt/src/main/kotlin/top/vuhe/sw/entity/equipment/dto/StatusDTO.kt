package top.vuhe.sw.entity.equipment.dto

/**
 * 状态传送包
 *
 * @property channel 通道号
 * @property status  状态号
 */
data class StatusDTO(
    val channel: Int?,
    val status: Int?
)
