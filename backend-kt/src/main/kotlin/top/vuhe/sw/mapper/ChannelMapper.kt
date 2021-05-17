package top.vuhe.sw.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Mapper
import org.springframework.stereotype.Repository
import top.vuhe.sw.entity.ChannelDAO

@Mapper
@Repository
interface ChannelMapper: BaseMapper<ChannelDAO>