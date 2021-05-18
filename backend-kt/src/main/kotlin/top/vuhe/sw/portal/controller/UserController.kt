package top.vuhe.sw.portal.controller

import io.swagger.annotations.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.User
import top.vuhe.sw.portal.service.UserService

@Api(tags = ["用户相关接口"])
@RestController
@RequestMapping("/user")
class UserController(
    @Autowired private val userService: UserService
) {
    /**
     * 获取用户信息列表
     */
    @ApiOperation("获取用户列表")
    @ApiResponses(
        io.swagger.annotations.ApiResponse(code = 401, message = "token 失效"),
        io.swagger.annotations.ApiResponse(code = 403, message = "权限错误"),
        io.swagger.annotations.ApiResponse(code = 500, message = "系统内部错误")
    )
    @GetMapping("/getList")
    fun getUserList(): ApiResponse<List<User>> {
        return ApiResponse.ofSuccessWithDate(userService.getUserList())
    }

    /**
     * 添加用户
     */
    @ApiOperation("添加用户")
    @ApiImplicitParams(
        ApiImplicitParam(
            paramType = "body",
            name = "user",
            dataTypeClass = User::class,
            required = true,
            value = "用户信息"
        ),
    )
    @ApiResponses(
        io.swagger.annotations.ApiResponse(code = 401, message = "token 失效"),
        io.swagger.annotations.ApiResponse(code = 403, message = "权限错误"),
        io.swagger.annotations.ApiResponse(code = 500, message = "系统内部错误")
    )
    @PostMapping("/add")
    fun addUser(@RequestBody user: User): ApiResponse<*> {
        return userService.saveUser(user, false)
    }

    /**
     * 修改用户
     */
    @ApiOperation("修改用户")
    @ApiImplicitParams(
        ApiImplicitParam(
            paramType = "body",
            name = "user",
            dataTypeClass = User::class,
            required = true,
            value = "用户信息"
        ),
    )
    @ApiResponses(
        io.swagger.annotations.ApiResponse(code = 401, message = "token 失效"),
        io.swagger.annotations.ApiResponse(code = 403, message = "权限错误"),
        io.swagger.annotations.ApiResponse(code = 500, message = "系统内部错误")
    )
    @PutMapping("/modify")
    fun modifyUserById(@RequestBody user: User): ApiResponse<*> {
        return userService.saveUser(user, true)
    }

    /**
     * 删除用户
     */
    @ApiOperation("删除用户")
    @ApiImplicitParams(
        ApiImplicitParam(
            paramType = "body",
            name = "user",
            dataTypeClass = User::class,
            required = true,
            value = "用户信息"
        ),
    )
    @ApiResponses(
        io.swagger.annotations.ApiResponse(code = 401, message = "token 失效"),
        io.swagger.annotations.ApiResponse(code = 403, message = "权限错误"),
        io.swagger.annotations.ApiResponse(code = 500, message = "系统内部错误")
    )
    @DeleteMapping("/delete")
    fun deleteUser(@RequestBody user: User): ApiResponse<*> {
        return userService.deleteUser(user)
    }
}