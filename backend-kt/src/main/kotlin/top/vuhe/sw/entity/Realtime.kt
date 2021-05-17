package top.vuhe.sw.entity

import top.vuhe.sw.common.util.Date

typealias RealtimeValue = RiskFactorValue

/**
 * 实时值数据
 * 用于前端传送
 */
data class RealtimeVO(
    val date: Date,
    val list: List<RealtimeNode>
)

data class RealtimeNode(
    val perUnit: String,
    val channelName: String,
    val value: Double
)