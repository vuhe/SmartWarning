package top.vuhe.sw.portal.service.impl

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
import org.springframework.stereotype.Service
import top.vuhe.sw.common.util.LinkedList
import top.vuhe.sw.common.util.getAllRealtimeValue
import top.vuhe.sw.entity.ChannelDAO
import top.vuhe.sw.entity.RealtimeNode
import top.vuhe.sw.entity.RealtimeVO
import top.vuhe.sw.mapper.ChannelMapper
import top.vuhe.sw.portal.service.ChannelService

@Service("ChannelService")
class ChannelServiceImpl :
    ServiceImpl<ChannelMapper, ChannelDAO>(), ChannelService {

    private val channelMap by lazy {
        list().associateBy { it.id }
    }

    override fun getRealtimeInfo(driveId: Int): List<RealtimeVO> {
        val realtimeValue = getAllRealtimeValue(driveId)
        val listVO = ArrayList<RealtimeVO>(realtimeValue.size + 1)
        // 实时数据数组遍历
        for (r in realtimeValue) {
            // 处理一个实时数据
            val nodeList = LinkedList<RealtimeNode>()
            for (n in r.data) {
                channelMap[n.key]?.let {
                    nodeList.add(
                        RealtimeNode(
                            perUnit = it.perUnit,
                            channelName = it.channelName,
                            value = n.value
                        )
                    )
                }
            }
            listVO.add(
                RealtimeVO(
                    date = r.time,
                    list = nodeList
                )
            )
        }
        return listVO
    }
}