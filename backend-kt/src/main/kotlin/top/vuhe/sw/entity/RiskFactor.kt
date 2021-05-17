package top.vuhe.sw.entity

import top.vuhe.sw.common.util.Date

data class RiskFactorValue(
    val time: Date,
    val data: Map<Int, Double>
) {
    operator fun get(i: Int?): Double? {
        return data[i]
    }
}

data class RiskFactorVO(
    val time: Date,
    val list: List<RiskFactorNode>
)

data class RiskFactorNode(
    val driveName: String,
    val value: Double
)