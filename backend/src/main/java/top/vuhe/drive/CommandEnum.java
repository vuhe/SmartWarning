package top.vuhe.drive;

import lombok.AllArgsConstructor;
import lombok.Getter;
import top.vuhe.entity.equipment.ElectricInfo;
import top.vuhe.entity.equipment.bo.RealTimeBO;
import top.vuhe.entity.equipment.bo.StateBO;
import top.vuhe.entity.equipment.bo.ThresholdBO;

import java.util.List;

/**
 * @author zhuhe
 */
@Getter
@AllArgsConstructor
enum CommandEnum {
    /**
     * 平台登录
     */
    // 登录上传
    LOGIN_UP((byte) 0x10), LOGIN_RE((byte) 0x11),
    /**
     * 心跳上传
     */
    // 心跳上传
    HEARTBEAT_UP((byte) 0x20), HEARTBEAT_RE((byte) 0x21),
    /**
     * 数据上传
     */
    // 实时值上传
    NOW_VALUE_UP((byte) 0x30), NOW_VALUE_RE((byte) 0x31),
    // 阀值上传
    THRESHOLD_UP((byte) 0x32), THRESHOLD_RE((byte) 0x33),
    // 状态值上传
    STATUS_UP((byte) 0x34), STATUS_RE((byte) 0x35),
    // 系统信息上传
    SYS_INFO_UP((byte) 0x36), SYS_INFO_RE((byte) 0x37),
    // 断电上传
    POWER_OFF_UP((byte) 0x38),
    // 重合闸状态上传
    RECLOSING_STATE_UP((byte) 0x39),
    /**
     * 数据查询
     */
    // 查询模块信息
    QUERY_INFO_UP((byte) 0x40), QUERY_INFO_RE((byte) 0x41),
    // 查询实时值
    QUERY_NOW_UP((byte) 0x44), QUERY_NOW_RE((byte) 0x45),
    // 查询阀值
    QUERY_THRESHOLD_UP((byte) 0x46), QUERY_THRESHOLD_RE((byte) 0x47),
    // 查询状态值
    QUERY_STATUS_UP((byte) 0x48), QUERY_STATUS_RE((byte) 0x49),
    // 查询系统信息
    QUERY_SYS_UP((byte) 0x4A), QUERY_SYS_RE((byte) 0x4B);
    /**
     * 数据设置、远程控制、远程升级
     * 不开放使用
     */

    private final byte code;

    static CommandEnum getCommandByCode(int b) {
        for (CommandEnum command : CommandEnum.values()) {
            if (command.getCode() == b) {
                return command;
            }
        }
        return null;
    }

    static CommandEnum getResponseCode(CommandEnum b) {
        switch (b) {
            case LOGIN_UP:
                return LOGIN_RE;
            case HEARTBEAT_UP:
                return HEARTBEAT_RE;
            case NOW_VALUE_UP:
                return NOW_VALUE_RE;
            case THRESHOLD_UP:
                return THRESHOLD_RE;
            case STATUS_UP:
                return STATUS_RE;
            case SYS_INFO_UP:
                return SYS_INFO_RE;
            default:
                return null;
        }
    }

    static ElectricInfo getInfoByCode(CommandEnum command, List<Byte> list) {
        switch (command) {
            case NOW_VALUE_UP:
            case QUERY_NOW_RE:
                return new RealTimeBO(list);
            case THRESHOLD_UP:
            case QUERY_THRESHOLD_RE:
                return new ThresholdBO(list);
            case STATUS_UP:
            case QUERY_STATUS_RE:
                return new StateBO(list);
            default:
                return null;
        }
    }
}
