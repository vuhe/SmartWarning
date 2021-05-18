package top.vuhe.sw.portal.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.RealtimeVO
import top.vuhe.sw.portal.service.ChannelService

@RestController
@RequestMapping("/realtime")
class RealtimeController(
    @Autowired private val channelService: ChannelService
) {
    @GetMapping("/getAll")
    fun getAllRealtime(@RequestParam("driveId") driveId: Int):
            ApiResponse<List<RealtimeVO>> {
        return ApiResponse.ofSuccessWithDate(
            channelService.getRealtimeInfo(driveId)
        )
    }
}