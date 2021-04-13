package top.vuhe.sw.entity.equipment.dto

typealias ThresholdDTO = List<ThresholdPair>

/**
 * 阈值传送包
 *
 * @property channel   通道号
 * @property threshold 阈值
 */
data class ThresholdPair(
    val channel: Int?,
    val threshold: Int?
)
