package top.vuhe.portal.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.vuhe.entity.DeviceInfo;
import top.vuhe.mapper.DeviceInfoMapper;
import top.vuhe.portal.service.intf.DeviceInfoService;

/**
 * @author zhuhe
 */
@Service("DeviceInfoService")
public class DeviceInfoServiceImpl
        extends ServiceImpl<DeviceInfoMapper, DeviceInfo>
        implements DeviceInfoService {
    @Override
    public DeviceInfo getDeviceInfoById(Integer id) {
        return getById(id);
    }
}
