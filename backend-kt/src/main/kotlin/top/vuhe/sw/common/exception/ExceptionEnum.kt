package top.vuhe.sw.common.exception

/**
 * 系统错误 枚举
 *
 * @property code 错误代码
 * @property message 错误信息
 */
enum class ExceptionEnum(val code: Int, val message: String) {
    // 系统错误
    UNKNOWN(500, "系统内部错误，请联系管理员"),
    DATA_ERROR(501, "数据异常"),
    USERNAME_ERROR(502, "用户名错误"),

    // 鉴权错误
    INVALID_TOKEN(401, "请重新登录"),
    TOKEN_GENERATOR_ERROR(402, "token生成异常"),
    PERMISSION_ERROR(403, "权限错误"),
    LOGIN_ERROR(405, "登录失败，请检查密码"),
    INVALID_USER(406, "非法用户")
}