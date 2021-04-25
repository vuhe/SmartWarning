package top.vuhe.sw.entity.equipment.bo

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.dto.RealTimeDTO
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.dto.ThresholdDTO

class RealTimeBO(bytes: List<Byte>) : ElectricInfo {
    companion object {
        private const val HEAD_LEN = 2
        private const val ROW_LEN = 3
        private val hasTowValue = setOf(
            37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59
        )
    }

    private val status: StatusDTO
    private val values: RealTimeDTO

    init {
        require(
            !(bytes.size < HEAD_LEN || (bytes.size - HEAD_LEN) % ROW_LEN != 0)
        ) { "读取byte时出错" }
        val it = bytes.iterator()
        // 初始化状态List
        val statusList: MutableMap<Int, Int> = HashMap(52)
        statusList[100] = it.next().toInt() and 0xFF
        // 初始化值List
        val valueMap: MutableMap<Int, Double> = HashMap(52)
        // 设置信号强度
        valueMap[101] = (it.next().toInt() and 0xff) * 1.0
        // 存储实时值
        val length: Int = (bytes.size - HEAD_LEN) / ROW_LEN
        for (i in 0 until length) {
            val channel: Int = it.next().toInt() and 0xFF
            var value: Int = it.next().toInt() and 0xFF
            value = value shl 8 + (it.next().toInt() and 0xFF)

            if (value == 0xFFFF) {
                statusList[channel] = 0
            } else {
                valueMap[channel] = value * 1.0 / 10
            }
        }
        // 合并高低位
        for (ch in hasTowValue) {
            if (valueMap[ch] != null) {
                val value = valueMap[ch]!!
                val nextVal = valueMap[ch + 1]!!
                valueMap[ch] = value * 10_000 + nextVal
                valueMap.remove(ch + 1)
            }
            if (statusList[ch] != null) {
                statusList.remove(ch + 1)
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
