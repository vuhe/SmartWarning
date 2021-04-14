package top.vuhe.sw.portal.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.log.UserLogVO
import top.vuhe.sw.portal.service.UserLogService

@RestController
@RequestMapping("/log")
class LogController {
    @Autowired
    private lateinit var userLogService: UserLogService

    /**
     * 获取用户登录日志
     */
    @GetMapping("/userLog")
    fun searchUserLog(): ApiResponse<List<UserLogVO>> {
        return ApiResponse.ofSuccessWithDate(userLogService.searchAllLog())
    }
}