package top.vuhe.portal.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import top.vuhe.entity.log.UserLogDao;
import top.vuhe.entity.log.UserLogVO;
import top.vuhe.mapper.UserLogMapper;
import top.vuhe.portal.service.intf.UserLogService;

import java.util.Date;
import java.util.List;

/**
 * @author zhuhe
 */
@Service("UserLogService")
public class UserLogServiceImpl extends ServiceImpl<UserLogMapper, UserLogDao> implements UserLogService {

    @Override
    public void insertLogByUserId(Integer userId, String info) {
        UserLogDao userLogDao = new UserLogDao();
        userLogDao.setUserId(null);
        userLogDao.setChangeTime(new Date());
        userLogDao.setUserId(userId);
        userLogDao.setOperationDetail(info);
        save(userLogDao);
    }

    @Override
    public List<UserLogVO> searchAllLog() {
        return baseMapper.selectAllLog();
    }
}
