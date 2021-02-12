package top.vuhe.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import top.vuhe.common.ApiResponse;
import top.vuhe.entity.User;
import top.vuhe.portal.service.intf.UserService;

/**
 * @author zhuhe
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 通过 id 获取用户信息
     *
     * @param id id
     * @return user
     */
    @GetMapping("/get")
    public ApiResponse<User> getUserInfoById(@RequestParam("id") Integer id) {
        return ApiResponse.ofSuccessWithDate(userService.getUserInfoById(id));
    }
}
