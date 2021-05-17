package top.vuhe.sw.entity

import com.baomidou.mybatisplus.annotation.TableName
import top.vuhe.sw.common.util.Date

@TableName("drive_log")
data class DriveLogDAO(
    val id: Int?,
    val time: Date,
    val driveId: Int,
    val status: StatusColor,
    val isProcessed: Boolean,
    val detail: String?
)

data class DriveLogVO(
    val id: Int?,
    val time: Date,
    val driveName: String,
    val status: StatusColor,
    val isProcessed: Boolean,
    val detail: String?
)

/**
 * 状态颜色信息
 */
enum class StatusColor {
    Grey, Green, Yellow, Red
}