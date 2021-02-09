package top.vuhe.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import top.vuhe.common.ApiResponse;
import top.vuhe.entity.DeviceInfo;
import top.vuhe.portal.service.intf.DeviceInfoService;

/**
 * @author zhuhe
 */
@RestController
@RequestMapping("/device_info")
public class DeviceInfoController {
    @Autowired
    private DeviceInfoService service;

    /**
     * 通过 id 获取设备信息
     *
     * @param id id
     * @return 设备信息
     */
    @GetMapping("/get")
    public ApiResponse<DeviceInfo> getDeviceInfoById(@RequestParam("id") Integer id) {
        return ApiResponse.ofSuccessWithDate(service.getDeviceInfoById(id));
    }
}
