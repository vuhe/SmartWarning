package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.dto.ThresholdDTO
import java.util.*

class ThresholdBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val ROW_LEN = 3
    }

    private val status: List<StatusDTO>
    private val thresholds: List<ThresholdDTO>

    init {
        require(bytes.size % ROW_LEN == 0) { "读取byte时出错" }
        val it = bytes.iterator()
        // 初始化List
        val statusList: MutableList<StatusDTO> = LinkedList()
        val thresholdList: MutableList<ThresholdDTO> = LinkedList()
        // 存储实时值
        val length = bytes.size / ROW_LEN
        for (i in 0 until length) {
            val channel = it.next().toInt()
            var value = it.next().toInt()
            value = value shl 8 + it.next()
            if (value == 0xFFFF) {
                statusList.add(StatusDTO(channel, 0))
            } else {
                thresholdList.add(ThresholdDTO(channel, value))
            }
        }
        status = Collections.unmodifiableList(statusList)
        thresholds = Collections.unmodifiableList(thresholdList)
    }

    override fun getRealTimeDTO(): Map<Int, Double>? {
        return null
    }

    override fun getStatusDTO(): List<StatusDTO> {
        return status
    }

    override fun getThresholdDTO(): List<ThresholdDTO> {
        return thresholds
    }
}