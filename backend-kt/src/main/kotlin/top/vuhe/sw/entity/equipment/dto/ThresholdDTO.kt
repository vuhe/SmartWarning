package top.vuhe.sw.entity.equipment.dto

/**
 * 阈值传送包
 *
 * @property channel   通道号
 * @property threshold 阈值
 */
data class ThresholdDTO(
    val channel: Int?,
    val threshold: Int?
)
