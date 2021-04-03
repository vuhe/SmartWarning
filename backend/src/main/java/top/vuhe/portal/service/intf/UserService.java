package top.vuhe.portal.service.intf;

import com.baomidou.mybatisplus.extension.service.IService;
import top.vuhe.common.ApiResponse;
import top.vuhe.entity.User;

import java.util.List;

/**
 * @author zhuhe
 */
public interface UserService extends IService<User> {
    /**
     * 登录
     *
     * @param user 登录信息
     * @return 携带 token 的信息
     */
    ApiResponse<?> login(User user);

    /**
     * 按 id 获取 User
     *
     * @return User
     */
    List<User> getUserList();

    /**
     * 修改/添加一个用户
     *
     * @param user     修改/添加信息
     * @param isModify 是否是修改
     * @return 是否成功
     */
    ApiResponse<?> saveUser(User user, boolean isModify);

    /**
     * 删除一个用户
     *
     * @param user 删除信息
     * @return 是否成功
     */
    ApiResponse<?> deleteUser(User user);

    /**
     * 按 token 获取 User
     *
     * @param token token
     * @return User
     */
    User getUserByToken(String token);

    /**
     * 登出
     *
     * @return 是否成功
     */
    ApiResponse<?> logout();
}
