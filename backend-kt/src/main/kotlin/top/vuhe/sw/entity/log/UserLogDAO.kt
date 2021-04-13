package top.vuhe.sw.entity.log

import com.baomidou.mybatisplus.annotation.TableName
import java.util.*

/**
 * 用户日志信息
 * 用于对接数据库
 *
 * @property id              id
 * @property userId          用户id
 * @property changeTime      更改时间
 * @property operationDetail 操作
 */
@TableName(value = "user_log")
data class UserLogDAO(
    val id: Int?,
    val userId: Int?,
    val changeTime: Date?,
    val operationDetail: String?
):UserLog
