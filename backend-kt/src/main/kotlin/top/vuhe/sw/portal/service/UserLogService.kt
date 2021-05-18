package top.vuhe.sw.portal.service

import com.baomidou.mybatisplus.extension.service.IService
import top.vuhe.sw.entity.UserLogDAO
import top.vuhe.sw.entity.UserLogVO

interface UserLogService : IService<UserLogDAO> {
    /**
     * 通过userId添加数据
     *
     * @param userId userId
     * @param info   操作信息
     */
    fun insertLogByUserId(userId: Int?, info: String?)

    /**
     * 查询所有 log 信息
     *
     * @return log 信息
     */
    fun searchAllLog(): List<UserLogVO>
}