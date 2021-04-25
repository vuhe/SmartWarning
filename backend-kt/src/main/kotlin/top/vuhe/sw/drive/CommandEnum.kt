package top.vuhe.sw.drive

import top.vuhe.sw.entity.equipment.ElectricInfo
import top.vuhe.sw.entity.equipment.bo.RealTimeBO
import top.vuhe.sw.entity.equipment.bo.StateBO
import top.vuhe.sw.entity.equipment.bo.ThresholdBO

/**
 * ## 电气设备应答命令
 * 用于整合设备与平台之间的通信
 *
 * @property code 命令
 */
enum class CommandEnum(val code: Byte) {
    /**
     * 平台登录
     */
    // 登录上传
    LOGIN_UP(0x10), LOGIN_RE(0x11),

    /**
     * 心跳上传
     */
    // 心跳上传
    HEARTBEAT_UP(0x20), HEARTBEAT_RE(0x21),

    /**
     * 数据上传
     */
    // 实时值上传
    NOW_VALUE_UP(0x30), NOW_VALUE_RE(0x31),

    // 阀值上传
    THRESHOLD_UP(0x32), THRESHOLD_RE(0x33),

    // 状态值上传
    STATUS_UP(0x34), STATUS_RE(0x35),

    // 系统信息上传
    SYS_INFO_UP(0x36), SYS_INFO_RE(0x37),

    // 断电上传
    POWER_OFF_UP(0x38),

    // 重合闸状态上传
    RECLOSING_STATE_UP(0x39),

    /**
     * 数据查询
     */
    // 查询模块信息
    QUERY_INFO_UP(0x40), QUERY_INFO_RE(0x41),

    // 查询实时值
    QUERY_NOW_UP(0x44), QUERY_NOW_RE(0x45),

    // 查询阀值
    QUERY_THRESHOLD_UP(0x46), QUERY_THRESHOLD_RE(0x47),

    // 查询状态值
    QUERY_STATUS_UP(0x48), QUERY_STATUS_RE(0x49),

    // 查询系统信息
    QUERY_SYS_UP(0x4A), QUERY_SYS_RE(0x4B);

    /**
     * 数据设置、远程控制、远程升级
     * 不开放使用
     */

    companion object {
        fun getCommandByCode(b: Int): CommandEnum {
            for (command in values()) {
                if (command.code.toInt() == b) {
                    return command
                }
            }
            throw IllegalArgumentException("命令错误")
        }

        fun getResponseCode(b: CommandEnum): CommandEnum? {
            return when (b) {
                LOGIN_UP -> LOGIN_RE
                HEARTBEAT_UP -> HEARTBEAT_RE
                NOW_VALUE_UP -> NOW_VALUE_RE
                THRESHOLD_UP -> THRESHOLD_RE
                STATUS_UP -> STATUS_RE
                SYS_INFO_UP -> SYS_INFO_RE
                else -> null
            }
        }

        fun getInfoByCode(command: CommandEnum, list: List<Byte>): ElectricInfo? {
            return when (command) {
                NOW_VALUE_UP, QUERY_NOW_RE -> RealTimeBO(list)
                THRESHOLD_UP, QUERY_THRESHOLD_RE -> ThresholdBO(list)
                STATUS_UP, QUERY_STATUS_RE -> StateBO(list)
                else -> null
            }
        }
    }
}