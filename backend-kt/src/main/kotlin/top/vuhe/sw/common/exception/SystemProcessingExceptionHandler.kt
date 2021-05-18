package top.vuhe.sw.common.exception

import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.common.util.Slf4j
import top.vuhe.sw.common.util.Slf4j.Companion.log

/**
 * 统一异常处理器
 *
 * @author vuhe
 */
@Slf4j
@RestControllerAdvice
class SystemProcessingExceptionHandler {
    /**
     * 处理自己抛出的异常
     */
    @ExceptionHandler(SystemProcessingException::class)
    fun handleMyException(e: SystemProcessingException): ApiResponse<*> {
        return ApiResponse.ofException(e)
    }

    /**
     * 其它异常拦截
     */
    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception): ApiResponse<*> {
        log.error(e.message, e)
        return ApiResponse.ofErrorEnum(ExceptionEnum.UNKNOWN)
    }
}