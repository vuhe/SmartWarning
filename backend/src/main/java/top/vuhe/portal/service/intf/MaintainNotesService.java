package top.vuhe.portal.service.intf;

import com.baomidou.mybatisplus.extension.service.IService;
import top.vuhe.entity.MaintainNotes;

/**
 * @author zhuhe
 */
public interface MaintainNotesService extends IService<MaintainNotes> {
    /**
     * 按 id 获取维护信息
     *
     * @param id id
     * @return MaintainNotes
     */
    MaintainNotes getMaintainNotesById(Integer id);
}
