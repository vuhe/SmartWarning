package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.RealTimeDTO
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.dto.ThresholdDTO

class StateBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val ROW_LEN = 2
        private val hasTowValue = setOf(
            37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59
        )
    }

    private val status: StatusDTO

    init {
        require(bytes.size % ROW_LEN == 0) { "读取byte时出错" }
        val it = bytes.iterator()
        val statusMap: MutableMap<Int, Int> = HashMap(52)
        // 存储实时值
        val length = bytes.size / ROW_LEN
        for (i in 0 until length) {
            val channel = it.next().toInt() and 0xFF
            val value = it.next().toInt() and 0xFF
            statusMap[channel]= value
        }
        // 合并高低位
        for (ch in hasTowValue) {
            if (statusMap[ch] != null) {
                statusMap.remove(ch + 1)
            }
        }
        status = statusMap
    }

    override fun getRealTimeDTO(): RealTimeDTO? {
        return null
    }

    override fun getStatusDTO(): StatusDTO {
        return status
    }

    override fun getThresholdDTO(): ThresholdDTO? {
        return null
    }
}