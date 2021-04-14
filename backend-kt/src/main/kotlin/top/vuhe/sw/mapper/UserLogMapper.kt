package top.vuhe.sw.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Select
import org.springframework.stereotype.Repository
import top.vuhe.sw.entity.log.UserLogDAO
import top.vuhe.sw.entity.log.UserLogVO

@Mapper
@Repository
interface UserLogMapper: BaseMapper<UserLogDAO> {
    /**
     * 通过 view 查询所有信息
     *
     * @return 视图信息
     */
    @Select("select * from user_log_view order by change_time desc")
    fun selectAllLog(): List<UserLogVO>
}