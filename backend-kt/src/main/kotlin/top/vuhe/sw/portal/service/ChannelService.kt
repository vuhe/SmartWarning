package top.vuhe.sw.portal.service

import com.baomidou.mybatisplus.extension.service.IService
import top.vuhe.sw.entity.ChannelDAO
import top.vuhe.sw.entity.RealtimeVO

interface ChannelService : IService<ChannelDAO> {
    /**
     * 获取实时值
     *
     * @param driveId 设备id
     * @return 实时值信息
     */
    fun getRealtimeInfo(driveId: Int): List<RealtimeVO>
}