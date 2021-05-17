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