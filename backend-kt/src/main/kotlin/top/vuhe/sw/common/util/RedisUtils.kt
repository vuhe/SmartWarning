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

fun handleRealtime(drive: Int, data: RealtimeValue) = putRealtimeValue(drive, data)

fun handleRiskFactor(data: RiskFactorValue) = putRiskFactorValue(data)

fun getAllRealtimeValue(driveId: Int): List<RealtimeValue> {
    val driveKey = "drive_$driveId"
    val list = ArrayList<RealtimeValue>()
    listOps.range(driveKey, 0, -1)?.forEach {
        list.add(toObj(it))
    }
    return list
}

fun putRealtimeValue(driveId: Int, data: RealtimeValue) {
    val driveKey = "drive_$driveId"
    listOps.leftPush(driveKey, toJson(data))
    listOps.trim(driveKey, 0, 49)
}

fun getAllRiskFactorValue(): List<RiskFactorValue> {
    val key = "risk_factor"
    val list = ArrayList<RiskFactorValue>()
    listOps.range(key, 0, -1)?.forEach {
        list.add(toObj(it))
    }
    return list
}

fun putRiskFactorValue(data: RiskFactorValue) {
    val key = "risk_factor"
    listOps.leftPush(key, toJson(data))
    listOps.trim(key, 0, 49)
}