package top.vuhe.portal.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.shiro.SecurityUtils;
import org.springframework.stereotype.Service;
import top.vuhe.common.ApiResponse;
import top.vuhe.common.exception.ExceptionEnum;
import top.vuhe.common.util.TokenUtils;
import top.vuhe.entity.User;
import top.vuhe.mapper.UserMapper;
import top.vuhe.portal.service.intf.UserService;

import java.util.List;

/**
 * @author zhuhe
 */
@Service("UserService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Override
    public ApiResponse<?> login(User user) {
        // 向数据库查询用户
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", user.getUsername())
                .last("LIMIT 1");

        // 检查用户是否存在
        User checkedUser = getOne(queryWrapper);
        if (checkedUser == null) {
            return ApiResponse.of(
                    ExceptionEnum.INVALID_USER.getCode(),
                    ExceptionEnum.INVALID_USER.getMessage(),
                    null);
        }

        // 检查密码是否正确
        if (!checkedUser.getPassword().equals(
                TokenUtils.sha256Hash(user.getUsername(), user.getPassword()))) {
            return ApiResponse.of(
                    ExceptionEnum.PASSWORD_WRONG.getCode(),
                    ExceptionEnum.PASSWORD_WRONG.getMessage(),
                    null);
        }

        checkedUser.setToken(TokenUtils.generateValue());

        // 更新数据库的 token
        if (!updateById(checkedUser)) {
            return ApiResponse.of(
                    ExceptionEnum.UNKNOWN.getCode(),
                    ExceptionEnum.UNKNOWN.getMessage(),
                    null);
        }

        return ApiResponse.ofSuccessWithDate(checkedUser);
    }

    @Override
    public List<User> getUserList() {
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.ne("id", user.getId());
        return list(queryWrapper);
    }

    @Override
    public ApiResponse<?> saveUser(User user, boolean isModify) {
        if (!isModify) {
            user.setId(null);
        }
        user.setToken(null);
        return saveOrUpdate(user) ? ApiResponse.ofSuccess()
                : ApiResponse.ofErrorEnum(ExceptionEnum.DATA_ERROR);
    }

    @Override
    public ApiResponse<?> deleteUser(User user) {
        return removeById(user.getId()) ? ApiResponse.ofSuccess()
                : ApiResponse.ofErrorEnum(ExceptionEnum.DATA_ERROR);
    }

    @Override
    public User getUserByToken(String token) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("token", token)
                .last("LIMIT 1");
        return getOne(queryWrapper);
    }

    @Override
    public ApiResponse<?> logout() {
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        user.setToken(null);

        // 更新数据库的 token
        if (!updateById(null)) {
            return ApiResponse.ofErrorEnum(ExceptionEnum.UNKNOWN);
        }

        return ApiResponse.ofSuccess();
    }
}
