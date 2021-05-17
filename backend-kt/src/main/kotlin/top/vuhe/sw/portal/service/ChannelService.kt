package top.vuhe.sw.portal.service

import com.baomidou.mybatisplus.extension.service.IService
import top.vuhe.sw.entity.equipment.dao.ChannelDAO
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.RealtimeVO
import top.vuhe.sw.entity.RealtimeValue

interface ChannelService : IService<ChannelDAO> {
    /**
     * 更新状态信息
     *
     * @param status 状态
     */
    fun updateStates(status: StatusDTO)

    /**
     * 获取实时值的附加信息
     *
     * @param realTimeDTO 实时值
     * @return 处理后的视图
     */
    fun getRealTimeInfo(realTimeDTO: RealtimeValue): List<RealtimeVO>
}