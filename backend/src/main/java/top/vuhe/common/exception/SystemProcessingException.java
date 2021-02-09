package top.vuhe.common.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 系统运行异常
 *
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class SystemProcessingException extends RuntimeException {
    private int code;
    private String msg;

    public SystemProcessingException() {
        super(ExceptionEnum.UNKNOWN.getMessage());
        this.code = 500;
        this.msg = ExceptionEnum.UNKNOWN.getMessage();
    }

    public SystemProcessingException(ExceptionEnum eEnum) {
        this.code = eEnum.getCode();
        this.msg = eEnum.getMessage();
    }

    public SystemProcessingException(String e) {
        this.code = 500;
        this.msg = e;
    }

    public SystemProcessingException(ExceptionEnum eEnum, Throwable e) {
        super(eEnum.getMessage(), e);
        this.code = eEnum.getCode();
        this.msg = eEnum.getMessage();
    }

}
