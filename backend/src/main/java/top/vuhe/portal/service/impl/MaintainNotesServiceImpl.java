package top.vuhe.portal.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.vuhe.entity.MaintainNotes;
import top.vuhe.mapper.MaintainNotesMapper;
import top.vuhe.portal.service.intf.MaintainNotesService;

/**
 * @author zhuhe
 */
@Service("MaintainNotesService")
public class MaintainNotesServiceImpl
        extends ServiceImpl<MaintainNotesMapper, MaintainNotes>
        implements MaintainNotesService {
    @Override
    public MaintainNotes getMaintainNotesById(Integer id) {
        return getById(id);
    }
}
