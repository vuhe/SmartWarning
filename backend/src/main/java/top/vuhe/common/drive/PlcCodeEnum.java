package top.vuhe.common.drive;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author zhuhe
 */
@Getter
@AllArgsConstructor
public enum PlcCodeEnum {
    // 平台登录
    LOGIN_UP((byte) 0x10),
    LOGIN_RE((byte) 0x11);

    private final byte code;
}
