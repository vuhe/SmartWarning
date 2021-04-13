package top.vuhe.sw.entity.equipment.dao

import com.baomidou.mybatisplus.annotation.TableName
import top.vuhe.sw.entity.equipment.StatusColor

@TableName(value = "status_info")
data class StatusDAO(
    val id: Int?,
    val statusName: String?,
    val statusColor: StatusColor,
)

