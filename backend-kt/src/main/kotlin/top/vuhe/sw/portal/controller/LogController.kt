package top.vuhe.sw.portal.controller

import io.swagger.annotations.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.UserLogVO
import top.vuhe.sw.portal.service.UserLogService

@Api(tags = ["日志相关接口"])
@RestController
@RequestMapping("/log")
class LogController {
    @Autowired
    private lateinit var userLogService: UserLogService

    /**
     * 获取用户登录日志
     */
    @ApiOperation("获取用户登录日志")
    @ApiResponses(
        io.swagger.annotations.ApiResponse(code = 401, message = "token 失效"),
        io.swagger.annotations.ApiResponse(code = 403, message = "权限错误"),
        io.swagger.annotations.ApiResponse(code = 500, message = "系统内部错误")
    )
    @GetMapping("/userLog")
    fun searchUserLog(): ApiResponse<List<UserLogVO>> {
        return ApiResponse.ofSuccessWithDate(userLogService.searchAllLog())
    }
}