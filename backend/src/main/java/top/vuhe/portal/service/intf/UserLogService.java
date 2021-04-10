package top.vuhe.portal.service.intf;

import com.baomidou.mybatisplus.extension.service.IService;
import top.vuhe.entity.log.UserLogDao;
import top.vuhe.entity.log.UserLogVO;

import java.util.List;

/**
 * @author zhuhe
 */
public interface UserLogService extends IService<UserLogDao> {
    /**
     * 通过userId添加数据
     *
     * @param userId userId
     * @return 是否成功
     */
    boolean insertLogByUserId(Integer userId, String info);

    /**
     * 查询所有 log 信息
     *
     * @return log 信息
     */
    List<UserLogVO> searchAllLog();
}
