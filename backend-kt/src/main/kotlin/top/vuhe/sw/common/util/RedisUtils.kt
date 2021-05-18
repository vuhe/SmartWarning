package top.vuhe.sw.common.util

import top.vuhe.sw.entity.RealtimeValue
import top.vuhe.sw.entity.RiskFactorValue

/**
 * 默认过期时长，单位：秒
 */
const val DEFAULT_EXPIRE = (60 * 60 * 24).toLong()

/**
 * 不设置过期时长
 */
const val NOT_EXPIRE: Long = -1

val listOps = beanUtil.listOperations

fun handleRealtime(drive: Int, data: RealtimeValue) =
    putRealtimeValue(drive, data)

fun handleRiskFactor(data: RiskFactorValue) =
    putRiskFactorValue(data)

fun getAllRealtimeValue(driveId: Int) =
    getRedisList<RealtimeValue>("drive_$driveId")

fun putRealtimeValue(driveId: Int, data: RealtimeValue) =
    putRedisValue("drive_$driveId", data)

fun getAllRiskFactorValue() =
    getRedisList<RiskFactorValue>("risk_factor")

fun putRiskFactorValue(data: RiskFactorValue) =
    putRedisValue("risk_factor", data)

private fun putRedisValue(key: String, data: Any) {
    listOps.leftPush(key, toJson(data))
    listOps.trim(key, 0, 49)
}

private inline fun <reified T> getRedisList(key: String): List<T> {
    val list = ArrayList<T>()
    listOps.range(key, 0, -1)?.forEach {
        list.add(toObj(it))
    }
    return list
}