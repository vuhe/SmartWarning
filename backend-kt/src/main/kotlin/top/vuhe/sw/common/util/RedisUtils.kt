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

/**
 * Stream key
 */
const val STREAM_KEY = "realtime_stream"
val listOps = beanUtil.listOperations

fun getAllRealtimeValue(driveId: Int): List<RealtimeValue> {
    val driveKey = "drive_$driveId"
    return listOps.range(driveKey, 0, -1) ?: emptyList()
}

fun putRealtimeValue(driveId: Int, data: RealtimeValue) {
    val driveKey = "drive_$driveId"
    listOps.leftPush(driveKey, data)
    listOps.trim(driveKey, 0, 49)
}

fun getAllRiskFactorValue(): List<RiskFactorValue> {
    val key = "risk_factor"
    return listOps.range(key, 0, -1) ?: emptyList()
}

fun putRiskFactorValue(data: RiskFactorValue) {
    val key = "risk_factor"
    listOps.leftPush(key, data)
    listOps.trim(key, 0, 49)
}