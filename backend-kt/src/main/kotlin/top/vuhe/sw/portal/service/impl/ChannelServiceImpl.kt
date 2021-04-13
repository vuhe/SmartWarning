package top.vuhe.sw.portal.service.impl

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
import org.springframework.stereotype.Service
import top.vuhe.sw.entity.equipment.dao.ChannelDAO
import top.vuhe.sw.entity.equipment.dto.RealTimeDTO
import top.vuhe.sw.entity.equipment.dto.StatusDTO
import top.vuhe.sw.entity.equipment.vo.RealTimeVO
import top.vuhe.sw.mapper.ChannelMapper
import top.vuhe.sw.portal.service.ChannelService
import java.util.*

@Service("ChannelService")
class ChannelServiceImpl :
    ServiceImpl<ChannelMapper, ChannelDAO>(), ChannelService {
    override fun updateStates(status: StatusDTO) {
        val channels = LinkedList<ChannelDAO>()
        for (s in status) {
            channels.add(
                ChannelDAO(
                    id = s.channel,
                    perUnit = null,
                    currentState = s.status,
                    channelName = null
                )
            )
        }
        updateBatchById(channels)
    }

    override fun getRealTimeInfo(realTimeDTO: RealTimeDTO):List<RealTimeVO> {
        val results = LinkedList<RealTimeVO>()
        // 获取所有数据项
        val realTimeDtoList = baseMapper.selectAllRealTime()
        for (r in realTimeDtoList) {
            // 获取设备传来的值
            val value = realTimeDTO[r.id]
            // 如果有值，合并保存
            if (value != null) {
                results.add(r.copy(value = value))
            }
        }
        return results
    }
}