package top.vuhe.entity.log;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "user_log")
public class UserLogDao extends UserLog {
    private Integer userId;
}
