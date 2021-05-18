package top.vuhe.sw.portal.controller

import io.swagger.annotations.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.DriveLogVO
import top.vuhe.sw.entity.UserLogVO
import top.vuhe.sw.portal.service.DriveLogService
import top.vuhe.sw.portal.service.UserLogService

@Api(tags = ["日志相关接口"])
@RestController
@RequestMapping("/log")
class LogController(
    @Autowired private val userLogService: UserLogService,
    @Autowired private val driveLogService: DriveLogService
) {
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

    @GetMapping("/driveLog")
    fun searchDriveLog(): ApiResponse<List<DriveLogVO>> {
        return ApiResponse.ofSuccessWithDate(
            driveLogService.searchAllLog()
        )
    }

    @GetMapping("/driveInfo")
    fun searchDriveInfo(): ApiResponse<List<String>> {
        return ApiResponse.ofSuccessWithDate(
            driveLogService.searchAllInfo()
        )
    }

    @PutMapping("/handleDriveLog")
    fun searchHandleDriveLog(@RequestParam("id") id: Int): ApiResponse<*> {
        driveLogService.handleError(id)
        return ApiResponse.ofSuccess()
    }
}