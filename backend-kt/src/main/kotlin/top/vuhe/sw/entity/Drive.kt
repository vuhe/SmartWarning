package top.vuhe.sw.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName

@TableName("drive_info")
data class DriveDAO(
    @field:TableId(value = "id", type = IdType.AUTO)
    val id: Int?,
    val driveName: String
)

typealias DriveVO = DriveDAO