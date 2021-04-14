package top.vuhe.portal.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.vuhe.entity.equipment.dao.StatusDAO;
import top.vuhe.mapper.StatusMapper;
import top.vuhe.portal.service.intf.StatusService;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zhuhe
 */
@Service("StatusService")
public class StatusServiceImpl extends ServiceImpl<StatusMapper, StatusDAO> implements StatusService {
    private Map<Integer, StatusDAO> map = new HashMap<>(20);
    private Date date;

    @Override
    public Map<Integer, StatusDAO> getStatusInfo() {
        if (map == null) {
            List<StatusDAO> list = list();
            for (StatusDAO dao : list) {
                map.put(dao.getId(), dao);
            }
        }
        return map;
    }
}
