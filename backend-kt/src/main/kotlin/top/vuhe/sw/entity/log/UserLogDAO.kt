package top.vuhe.sw.entity.log

import com.baomidou.mybatisplus.annotation.TableName
import java.util.*

@TableName(value = "user_log")
data class UserLogDAO(
    val id: Int?,
    val userId: Int?,
    val changeTime: Date?,
    val operationDetail: String?
):UserLog
