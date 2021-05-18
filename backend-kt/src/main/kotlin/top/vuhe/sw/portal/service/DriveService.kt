package top.vuhe.sw.portal.service

import com.baomidou.mybatisplus.extension.service.IService
import top.vuhe.sw.entity.DriveDAO
import top.vuhe.sw.entity.DriveVO
import top.vuhe.sw.entity.RiskFactorVO

interface DriveService : IService<DriveDAO> {
    /**
     * 获取设备列表
     *
     * @return 设备列表
     */
    fun getDriveList(): List<DriveVO>

    /**
     * 获取设备风险系数
     *
     * @return 设备风险系数
     */
    fun getRiskFactor(): List<RiskFactorVO>

    /**
     * 通过设备id获取名称
     *
     * @param id 设备id
     * @return 名称
     */
    fun getDriveNameById(id: Int): String
}