package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.*
import java.util.*

class ThresholdBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val ROW_LEN = 3
        private val hasTowValue = setOf(
            37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59
        )
    }

    private val status: StatusDTO
    private val thresholds: ThresholdDTO

    init {
        require(bytes.size % ROW_LEN == 0) { "读取byte时出错" }
        val it = bytes.iterator()
        // 初始化List
        val statusMap: MutableMap<Int, Int> = HashMap(52)
        val thresholdMap: MutableMap<Int, Int> = HashMap(52)
        // 存储阈值
        val length = bytes.size / ROW_LEN
        for (i in 0 until length) {
            val channel = it.next().toInt() and 0xFF
            var value = it.next().toInt() and 0xFF
            value = value shl 8 + (it.next().toInt() and 0xFF)
            if (value == 0xFFFF) {
                statusMap[channel] = 0
            } else {
                thresholdMap[channel] = value
            }
        }
        // 合并高低位
        for (ch in hasTowValue) {
            if (thresholdMap[ch] != null) {
                val value = thresholdMap[ch]!!
                val nextVal = thresholdMap[ch + 1]!!
                thresholdMap[ch] = value * 10_000 + nextVal
                thresholdMap.remove(ch + 1)
            }
            if (statusMap[ch] != null) {
                statusMap.remove(ch + 1)
            }
        }
        status = statusMap
        thresholds = thresholdMap
    }

    override fun getRealTimeDTO(): RealTimeDTO? {
        return null
    }

    override fun getStatusDTO(): StatusDTO {
        return status
    }

    override fun getThresholdDTO(): ThresholdDTO {
        return thresholds
    }
}