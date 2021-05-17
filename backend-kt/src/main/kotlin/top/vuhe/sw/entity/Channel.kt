package top.vuhe.sw.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName

/**
 * 通道信息
 * 对应数据库中的表
 *
 * @property id           id
 * @property perUnit      单位
 * @property currentState 状态码
 * @property channelName  通道名
 */
@TableName(value = "channel_info")
data class ChannelDAO(
    @field:TableId(value = "id", type = IdType.AUTO)
    val id: Int?,
    val perUnit: String,
    val currentState: Int,
    val channelName: String
)