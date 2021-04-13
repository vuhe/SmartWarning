package top.vuhe.sw.entity.log

import com.baomidou.mybatisplus.annotation.TableName
import java.util.*

@TableName(value = "user_log_view")
data class UserLogVO(
    val id: Int?,
    val username: String?,
    val changeTime: Date?,
    val operationDetail: String?
) : UserLog
