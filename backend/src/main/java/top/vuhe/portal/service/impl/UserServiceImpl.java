package top.vuhe.portal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.vuhe.entity.User;
import top.vuhe.mapper.UserMapper;
import top.vuhe.portal.service.intf.UserService;

/**
 * @author zhuhe
 */
@Service("UserService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Override
    public User getUserInfoById(Integer id) {
        return getById(id);
    }

    @Override
    public User getUserByToken(String token) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("token", token)
                .last("LIMIT 1");
        return getOne(queryWrapper);
    }
}
