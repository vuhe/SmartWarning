package top.vuhe.portal.service.intf;

import com.baomidou.mybatisplus.extension.service.IService;
import top.vuhe.entity.User;

/**
 * @author zhuhe
 */
public interface UserService extends IService<User> {
    /**
     * 按 id 获取 User
     *
     * @param id id
     * @return User
     */
    User getUserInfoById(Integer id);
}
