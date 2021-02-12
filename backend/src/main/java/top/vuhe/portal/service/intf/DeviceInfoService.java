package top.vuhe.portal.service.intf;

import com.baomidou.mybatisplus.extension.service.IService;
import top.vuhe.entity.DeviceInfo;

/**
 * @author zhuhe
 */
public interface DeviceInfoService extends IService<DeviceInfo> {
    /**
     * 按 id 获取设备信息
     *
     * @param id id
     * @return DeviceInfo
     */
    DeviceInfo getDeviceInfoById(Integer id);
}
