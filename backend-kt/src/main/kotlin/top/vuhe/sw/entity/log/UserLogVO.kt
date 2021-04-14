package top.vuhe.sw.entity.log

import com.baomidou.mybatisplus.annotation.TableName
import java.util.*

/**
 * 用户日志信息
 * 用于发送到前端
 *
 * @property id              id
 * @property username        用户名
 * @property changeTime      更改时间
 * @property operationDetail 操作信息
 */
@TableName(value = "user_log_view")
data class UserLogVO(
    val id: Int?,
    val username: String?,
    val changeTime: Date?,
    val operationDetail: String?
) : UserLog
