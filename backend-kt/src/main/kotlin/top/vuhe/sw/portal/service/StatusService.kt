package top.vuhe.sw.portal.service

import com.baomidou.mybatisplus.extension.service.IService
import top.vuhe.sw.entity.equipment.dao.StatusDAO

interface StatusService: IService<StatusDAO> {
    /**
     * 获取状态值对应信息
     *
     * @return 状态信息
     */
    fun getStatusInfo(): Map<Int?, StatusDAO>
}