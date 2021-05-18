package top.vuhe.sw.portal.service

import com.baomidou.mybatisplus.extension.service.IService
import top.vuhe.sw.entity.DriveLogDAO
import top.vuhe.sw.entity.DriveLogVO

interface DriveLogService : IService<DriveLogDAO> {
    /**
     * 获取设备日志
     *
     * @return 设备日志信息
     */
    fun searchAllLog(): List<DriveLogVO>

    /**
     * 获取设备信息（简述）
     *
     * @return 设备简述信息
     */
    fun searchAllInfo(): List<String>

    /**
     * 处理设备错误
     *
     * @param id 日志id
     */
    fun handleError(id: Int)
}