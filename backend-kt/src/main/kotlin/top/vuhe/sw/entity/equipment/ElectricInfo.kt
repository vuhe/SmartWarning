package top.vuhe.sw.entity.equipment

import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.dto.ThresholdDTO

/**
 * 电力设备信息
 */
interface ElectricInfo {
    /**
     * 获取实时信息
     *
     * @return 实时值DTO
     */
    fun getRealTimeDTO(): Map<Int, Double>?

    /**
     * 获取状态信息
     *
     * @return 状态DTO
     */
    fun getStatusDTO(): List<StatusDTO>?

    /**
     * 获取阈值信息
     *
     * @return 阈值DTO
     */
    fun getThresholdDTO(): List<ThresholdDTO>?
}