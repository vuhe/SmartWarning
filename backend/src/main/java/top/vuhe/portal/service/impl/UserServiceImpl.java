package top.vuhe.portal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import top.vuhe.common.ApiResponse;
import top.vuhe.common.exception.ExceptionEnum;
import top.vuhe.entity.User;
import top.vuhe.mapper.UserMapper;
import top.vuhe.portal.service.intf.UserService;

import java.util.List;

/**
 * @author zhuhe
 */
@Service("UserService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService, UserDetailsService {
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public List<User> getUserList() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.ne("username", username);
        return list(queryWrapper);
    }

    @Override
    public ApiResponse<?> saveUser(User user, boolean isModify) {
        if (!isModify) {
            user.setId(null);
        }
        user.setPassword(
                encoder.encode(user.getPassword().trim()));
        return saveOrUpdate(user) ? ApiResponse.ofSuccess()
                : ApiResponse.ofErrorEnum(ExceptionEnum.DATA_ERROR);
    }

    @Override
    public ApiResponse<?> deleteUser(User user) {
        return removeById(user.getId()) ? ApiResponse.ofSuccess()
                : ApiResponse.ofErrorEnum(ExceptionEnum.DATA_ERROR);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 向数据库查询用户
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username)
                .last("LIMIT 1");

        // 检查用户是否存在
        User user = getOne(queryWrapper);
        if (user == null) {
            throw new UsernameNotFoundException("用户不存在");
        }

        return user;
    }
}
