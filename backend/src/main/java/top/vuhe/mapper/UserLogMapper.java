package top.vuhe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import top.vuhe.entity.log.UserLogDao;
import top.vuhe.entity.log.UserLogVO;

import java.util.List;

/**
 * @author zhuhe
 */
@Mapper
@Repository
public interface UserLogMapper extends BaseMapper<UserLogDao> {
    /**
     * 通过 view 查询所有信息
     *
     * @return 视图信息
     */
    @Select("select * from user_log_view")
    List<UserLogVO> selectAllLog();
}
