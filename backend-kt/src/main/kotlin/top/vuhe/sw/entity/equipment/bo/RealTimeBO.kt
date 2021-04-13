package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.dto.ThresholdDTO
import java.util.*

class RealTimeBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val HEAD_LEN = 2
        private const val ROW_LEN = 3
    }

    private val status: List<StatusDTO>
    private val values: Map<Int, Double>

    init {
        require(
            !(bytes.size < HEAD_LEN || (bytes.size - HEAD_LEN) % ROW_LEN != 0)
        ) { "读取byte时出错" }
        val it = bytes.iterator()
        // 初始化状态List
        val statusList: MutableList<StatusDTO> = LinkedList()
        statusList.add(StatusDTO(51, it.next().toInt()))
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
                statusList.add(StatusDTO(channel, 0))
            } else {
                valueMap[channel] = value * 1.0 / 10
            }
        }
        status = Collections.unmodifiableList(statusList)
        values = Collections.unmodifiableMap(valueMap)
    }

    override fun getRealTimeDTO(): Map<Int, Double> {
        return values
    }

    override fun getStatusDTO(): List<StatusDTO> {
        return status
    }

    override fun getThresholdDTO(): List<ThresholdDTO>? {
        return null
    }

}
