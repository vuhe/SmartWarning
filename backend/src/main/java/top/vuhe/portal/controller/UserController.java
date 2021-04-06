package top.vuhe.portal.controller;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import top.vuhe.common.ApiResponse;
import top.vuhe.entity.User;
import top.vuhe.portal.service.intf.UserService;

import java.util.List;

/**
 * @author zhuhe
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 登录
     */
    @PostMapping("/login")
    public ApiResponse<?> login(@RequestBody User user) {
        return userService.login(user);
    }

    /**
     * 获取用户信息列表
     */
    @RequiresRoles("Admin")
    @GetMapping("/getList")
    public ApiResponse<List<User>> getUserList() {
        return ApiResponse.ofSuccessWithDate(userService.getUserList());
    }

    /**
     * 添加用户
     */
    @RequiresRoles("Admin")
    @PostMapping("/add")
    public ApiResponse<?> addUser(@RequestBody User user) {
        return userService.saveUser(user, false);
    }

    /**
     * 修改用户
     */
    @RequiresRoles("Admin")
    @PutMapping("/modify")
    public ApiResponse<?> modifyUserById(@RequestBody User user) {
        return userService.saveUser(user, true);
    }

    /**
     * 删除用户
     */
    @RequiresRoles("Admin")
    @DeleteMapping("/delete")
    public ApiResponse<?> deleteUser(@RequestBody User user) {
        return userService.deleteUser(user);
    }

    /**
     * 登出
     */
    @RequiresRoles("User")
    @PostMapping("/logout")
    public ApiResponse<?> logout() {
        return userService.logout();
    }
}
