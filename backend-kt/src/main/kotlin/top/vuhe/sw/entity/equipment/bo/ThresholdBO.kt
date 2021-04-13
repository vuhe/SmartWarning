package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.*
import java.util.*

class ThresholdBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val ROW_LEN = 3
    }

    private val status: StatusDTO
    private val thresholds: ThresholdDTO

    init {
        require(bytes.size % ROW_LEN == 0) { "读取byte时出错" }
        val it = bytes.iterator()
        // 初始化List
        val statusList: MutableList<StatusPair> = LinkedList()
        val thresholdList: MutableList<ThresholdPair> = LinkedList()
        // 存储实时值
        val length = bytes.size / ROW_LEN
        for (i in 0 until length) {
            val channel = it.next().toInt()
            var value = it.next().toInt()
            value = value shl 8 + it.next()
            if (value == 0xFFFF) {
                statusList.add(StatusPair(channel, 0))
            } else {
                thresholdList.add(ThresholdPair(channel, value))
            }
        }
        status = statusList
        thresholds = thresholdList
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