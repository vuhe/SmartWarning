package top.vuhe.common;

import lombok.Getter;
import top.vuhe.common.exception.ExceptionEnum;
import top.vuhe.common.exception.SystemProcessingException;

/**
 * 通用返回类
 *
 * @author zhuhe
 */
@Getter
public class ApiResponse<T> {
    private int code;
    private String message;
    private String dataName;
    private T data;

    private ApiResponse() {
    }

    private ApiResponse(int code, String message, String name, T data) {
        this.code = code;
        this.message = message;
        this.dataName = name;
        this.data = data;
    }

    public static <T> ApiResponse<T> of(Integer code, String message, String name, T data) {
        return new ApiResponse<>(code, message, name, data);
    }

    public static <T> ApiResponse<T> of(Integer code, String message) {
        return new ApiResponse<>(code, message, "", null);
    }

    public static <T> ApiResponse<T> ofSuccess() {
        return of(200, "success");
    }

    public static <T> ApiResponse<T> ofSuccessWithDate(String name, T date) {
        return of(200, "success", name, date);
    }

    public static <T> ApiResponse<T> ofException(SystemProcessingException e) {
        return of(e.getCode(), e.getMessage());
    }

    public static <T> ApiResponse<T> ofErrorEnum(ExceptionEnum e) {
        return of(e.getCode(), e.getMessage());
    }

}
