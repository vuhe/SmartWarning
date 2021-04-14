package top.vuhe.portal.service.intf;

import com.baomidou.mybatisplus.extension.service.IService;
import top.vuhe.entity.equipment.dao.StatusDAO;

import java.util.Map;

/**
 * @author zhuhe
 */
public interface StatusService extends IService<StatusDAO> {
    /**
     * 获取状态值对应信息
     *
     * @return 状态信息
     */
    Map<Integer, StatusDAO> getStatusInfo();
}
