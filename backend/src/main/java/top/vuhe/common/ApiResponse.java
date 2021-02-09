package top.vuhe.common;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import top.vuhe.common.exception.ExceptionEnum;
import top.vuhe.common.exception.SystemProcessingException;

/**
 * 通用返回类
 *
 * @author zhuhe
 */
@Getter
@JsonSerialize(using = ApiResponseSerializer.class)
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;

    private ApiResponse() {
    }

    private ApiResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> of(Integer code, String message, T data) {
        return new ApiResponse<>(code, message, data);
    }

    public static <T> ApiResponse<T> of(Integer code, String message) {
        return new ApiResponse<>(code, message, null);
    }

    public static <T> ApiResponse<T> ofSuccess() {
        return of(200, "success");
    }

    public static <T> ApiResponse<T> ofSuccessWithDate(T date) {
        return of(200, "success", date);
    }

    public static <T> ApiResponse<T> ofException(SystemProcessingException e) {
        return of(e.getCode(), e.getMessage());
    }

    public static <T> ApiResponse<T> ofErrorEnum(ExceptionEnum e) {
        return of(e.getCode(), e.getMessage());
    }

}
