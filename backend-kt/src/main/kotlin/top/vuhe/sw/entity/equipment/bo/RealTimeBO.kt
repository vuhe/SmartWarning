package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.RealTimeDTO
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.dto.StatusPair
import top.vuhe.sw.entity.equipment.dto.ThresholdDTO
import java.util.*

class RealTimeBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val HEAD_LEN = 2
        private const val ROW_LEN = 3
    }

    private val status: StatusDTO
    private val values: RealTimeDTO

    init {
        require(
            !(bytes.size < HEAD_LEN || (bytes.size - HEAD_LEN) % ROW_LEN != 0)
        ) { "读取byte时出错" }
        val it = bytes.iterator()
        // 初始化状态List
        val statusList: MutableList<StatusPair> = LinkedList()
        statusList.add(StatusPair(51, it.next().toInt()))
        // 初始化值List
        val valueMap: MutableMap<Int, Double> = HashMap(52)
        // 设置信号强度
        valueMap[52] = it.next().toDouble()
        // 存储实时值
        val length: Int = (bytes.size - HEAD_LEN) / ROW_LEN
        for (i in 0 until length) {
            val channel: Int = it.next().toInt()
            var value: Int = it.next().toInt()
            value = value shl 8 + it.next()
            if (value == 0xFFFF) {
                statusList.add(StatusPair(channel, 0))
            } else {
                valueMap[channel] = value * 1.0 / 10
            }
        }
        status = statusList
        values = valueMap
    }

    override fun getRealTimeDTO(): RealTimeDTO {
        return values
    }

    override fun getStatusDTO(): StatusDTO {
        return status
    }

    override fun getThresholdDTO(): ThresholdDTO? {
        return null
    }

}
