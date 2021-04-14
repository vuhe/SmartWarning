package top.vuhe.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import top.vuhe.entity.auth.User;

/**
 * @author zhuhe
 */
@Mapper
@Repository
public interface UserMapper extends BaseMapper<User> {
}
