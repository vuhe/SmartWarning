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
    INVALID_TOKEN(401, "token失效，请重新登录"),
    TOKEN_GENERATOR_ERROR(402, "token生成异常");

    private final int code;
    private final String message;
}
