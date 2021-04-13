package top.vuhe.sw.portal.service.impl

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
import org.springframework.stereotype.Service
import top.vuhe.sw.entity.equipment.dao.StatusDAO
import top.vuhe.sw.mapper.StatusMapper
import top.vuhe.sw.portal.service.StatusService

@Service("StatusService")
class StatusServiceImpl : ServiceImpl<StatusMapper, StatusDAO>(), StatusService {
    private val map: MutableMap<Int?, StatusDAO> = HashMap(20)

    override fun getStatusInfo(): Map<Int?, StatusDAO> {
        if (true) {
            val list = list()
            for (dao in list) {
                map[dao.id] = dao
            }
        }
        return map
    }
}