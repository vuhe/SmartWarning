package top.vuhe.entity.log;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "user_log_view")
public class UserLogVO extends UserLog {
    private String username;
}
