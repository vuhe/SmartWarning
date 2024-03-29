package top.vuhe.sw.entity

import com.baomidou.mybatisplus.annotation.TableName
import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import top.vuhe.sw.common.util.Date

/**
 * 用户日志信息
 */
interface UserLog

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

/**
 * 用户日志信息
 * 用于发送到前端
 *
 * @property id              id
 * @property username        用户名
 * @property changeTime      更改时间
 * @property operationDetail 操作信息
 */
@ApiModel(value ="用户日志视图")
@TableName(value = "user_log_view")
data class UserLogVO(
    @field:ApiModelProperty(value = "id", readOnly = true)
    val id: Int?,
    @field:ApiModelProperty(value = "用户名", readOnly = true)
    val username: String?,
    @field:ApiModelProperty(value = "更改时间", readOnly = true)
    val changeTime: Date?,
    @field:ApiModelProperty(value = "操作详情", readOnly = true)
    val operationDetail: String?
) : UserLog