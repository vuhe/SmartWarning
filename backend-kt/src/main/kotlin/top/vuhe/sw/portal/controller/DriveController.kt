package top.vuhe.sw.portal.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.DriveVO
import top.vuhe.sw.entity.RiskFactorVO
import top.vuhe.sw.portal.service.DriveService

@RestController
@RequestMapping("/drive")
class DriveController(
    @Autowired private val driveService: DriveService
) {
    @GetMapping("/getInfo")
    fun getAllDrive(): ApiResponse<List<DriveVO>> {
        return ApiResponse.ofSuccessWithDate(
            driveService.getDriveList()
        )
    }

    @GetMapping("/getRiskFactor")
    fun getRiskFactor(): ApiResponse<List<RiskFactorVO>> {
        return ApiResponse.ofSuccessWithDate(
            driveService.getRiskFactor()
        )
    }
}