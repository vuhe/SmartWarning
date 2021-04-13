package top.vuhe.sw.entity.equipment.dao

import com.baomidou.mybatisplus.annotation.TableName
import top.vuhe.sw.entity.equipment.StatusColor

/**
 * ## 状态信息
 * 对应数据库中的表
 *
 * @author vuhe
 * @property id          id
 * @property statusName  状态名
 * @property statusColor 状态颜色
 */
@TableName(value = "status_info")
data class StatusDAO(
    val id: Int?,
    val statusName: String?,
    val statusColor: StatusColor,
)

