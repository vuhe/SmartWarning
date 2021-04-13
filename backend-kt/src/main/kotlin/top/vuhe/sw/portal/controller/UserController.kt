package top.vuhe.sw.portal.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.auth.User
import top.vuhe.sw.portal.service.UserService

@RestController
@RequestMapping("/user")
class UserController {
    @Autowired
    private lateinit var userService: UserService

    /**
     * 获取用户信息列表
     */
    @GetMapping("/getList")
    fun getUserList(): ApiResponse<List<User>> {
        return ApiResponse.ofSuccessWithDate(userService.getUserList())
    }

    /**
     * 添加用户
     */
    @PostMapping("/add")
    fun addUser(@RequestBody user: User): ApiResponse<*> {
        return userService.saveUser(user, false)
    }

    /**
     * 修改用户
     */
    @PutMapping("/modify")
    fun modifyUserById(@RequestBody user: User): ApiResponse<*> {
        return userService.saveUser(user, true)
    }

    /**
     * 删除用户
     */
    @DeleteMapping("/delete")
    fun deleteUser(@RequestBody user: User): ApiResponse<*> {
        return userService.deleteUser(user)
    }
}