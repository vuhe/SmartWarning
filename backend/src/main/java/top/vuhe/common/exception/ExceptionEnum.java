package top.vuhe.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @author zhuhe
 */

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
    // 系统错误
    UNKNOWN(500, "系统内部错误，请联系管理员"),
    DATA_ERROR(501, "数据异常"),

    // 鉴权错误
    INVALID_TOKEN(401, "请重新登录"),
    TOKEN_GENERATOR_ERROR(402, "token生成异常"),
    PERMISSION_ERROR(403, "权限错误"),
    LOGIN_ERROR(405, "登录失败，请检查密码"),
    INVALID_USER(406, "非法用户");

    private final int code;
    private final String message;
}
