package top.vuhe.sw.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Select
import org.springframework.stereotype.Repository
import top.vuhe.sw.entity.equipment.dao.ChannelDAO
import top.vuhe.sw.entity.RealtimeVO

@Mapper
@Repository
interface ChannelMapper: BaseMapper<ChannelDAO> {
    /**
     * 通过 view 查询所有信息
     *
     * @return 视图信息
     */
    @Select("select * from realtime_view")
    fun selectAllRealTime(): List<RealtimeVO>
}