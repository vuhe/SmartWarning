package top.vuhe.portal.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import top.vuhe.portal.service.intf.DeviceInfoService;

@SpringBootTest
public class DeviceInfoServiceTest {
    @Autowired
    private DeviceInfoService deviceInfoService;

    @Test
    void test1() {
        System.out.println(deviceInfoService.getDeviceInfoById(1));
    }
}
