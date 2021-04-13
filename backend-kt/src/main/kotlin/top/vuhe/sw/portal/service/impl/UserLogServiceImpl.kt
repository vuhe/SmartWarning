package top.vuhe.sw.portal.service.impl

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
import org.springframework.stereotype.Service
import top.vuhe.sw.entity.log.UserLogDAO
import top.vuhe.sw.entity.log.UserLogVO
import top.vuhe.sw.mapper.UserLogMapper
import top.vuhe.sw.portal.service.UserLogService
import java.util.*

@Service("UserLogService")
class UserLogServiceImpl : ServiceImpl<UserLogMapper, UserLogDAO>(), UserLogService {
    override fun insertLogByUserId(userId: Int?, info: String?) {
        save(
            UserLogDAO(
                id = null,
                userId = userId,
                changeTime = Date(),
                operationDetail = info
            )
        )
    }

    override fun searchAllLog(): List<UserLogVO> {
        return baseMapper.selectAllLog()
    }
}