package top.vuhe.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import top.vuhe.common.ApiResponse;

/**
 * 统一异常处理器
 *
 * @author zhuhe
 */
@Slf4j
@RestControllerAdvice
public class SystemProcessingExceptionHandler {
    /**
     * 处理自定义系统异常
     *
     * @param e 异常
     * @return 错误信息
     */
    @ExceptionHandler(SystemProcessingException.class)
    public ApiResponse<?> handleMyException(SystemProcessingException e) {
        return ApiResponse.ofException(e);
    }

    /**
     * 拦截其它错误
     *
     * @param e 异常
     * @return 错误信息
     */
    @ExceptionHandler(Exception.class)
    public ApiResponse<?> handleException(Exception e) {
        log.error(e.getMessage(), e);
        return ApiResponse.ofErrorEnum(ExceptionEnum.UNKNOWN);
    }
}
