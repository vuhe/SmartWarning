package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.RealTimeDTO
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.dto.StatusPair
import top.vuhe.sw.entity.equipment.dto.ThresholdDTO
import java.util.*

class StateBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val ROW_LEN = 2
    }

    private val status: StatusDTO

    init {
        require(bytes.size % ROW_LEN == 0) { "读取byte时出错" }
        val it = bytes.iterator()
        val statusList: MutableList<StatusPair> = LinkedList()
        // 存储实时值
        val length = bytes.size / ROW_LEN
        for (i in 0 until length) {
            val channel = it.next().toInt()
            val value = it.next().toInt()
            statusList.add(StatusPair(channel, value))
        }
        status = Collections.unmodifiableList(statusList)
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