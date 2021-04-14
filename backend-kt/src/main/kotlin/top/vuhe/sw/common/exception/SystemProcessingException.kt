package top.vuhe.sw.common.exception

import java.lang.RuntimeException

/**
 * 系统运行异常
 *
 * @author zhuhe
 */
class SystemProcessingException : RuntimeException {
    val msg: String
    val code: Int

    constructor() : super(ExceptionEnum.UNKNOWN.message) {
        this.code = 500
        this.msg = ExceptionEnum.UNKNOWN.message
    }

    constructor(eEnum: ExceptionEnum) {
        this.code = eEnum.code
        this.msg = eEnum.message
    }

    constructor(e: String) {
        this.code = 500
        this.msg = e
    }

    constructor(eEnum: ExceptionEnum, e: Throwable) : super(eEnum.message, e) {
        this.code = eEnum.code
        this.msg = eEnum.message
    }

}