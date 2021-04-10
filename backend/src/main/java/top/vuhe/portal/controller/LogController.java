package top.vuhe.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.vuhe.common.ApiResponse;
import top.vuhe.entity.log.UserLogVO;
import top.vuhe.portal.service.intf.UserLogService;

import java.util.List;

/**
 * @author zhuhe
 */
@RestController
@RequestMapping("/log")
public class LogController {
    @Autowired
    private UserLogService userLogService;

    /**
     * 获取用户登录日志
     */
    @GetMapping("/userLog")
    public ApiResponse<List<UserLogVO>> searchUserLog() {
        return ApiResponse.ofSuccessWithDate(userLogService.searchAllLog());
    }
}
