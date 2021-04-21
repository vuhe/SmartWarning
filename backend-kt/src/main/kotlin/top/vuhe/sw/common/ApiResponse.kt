package top.vuhe.sw.common

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import top.vuhe.sw.common.exception.ExceptionEnum
import top.vuhe.sw.common.exception.SystemProcessingException

/**
 * 通用返回类
 *
 * @author zhuhe
 */
@ApiModel(value = "通用返回数据")
@JsonSerialize(using = ApiResponseSerializer::class)
class ApiResponse<T> private constructor(
    @field:ApiModelProperty(value = "状态代码", readOnly = true)
    val code: Int,
    @field:ApiModelProperty(value = "状态信息", readOnly = true)
    val message: String,
    @field:ApiModelProperty(value = "数据", readOnly = true, allowEmptyValue = true)
    val data: T?
) {
    companion object {
        fun <T> of(code: Int, message: String, data: T?): ApiResponse<T> {
            return ApiResponse(code, message, data)
        }

        fun of(code: Int, message: String): ApiResponse<*> {
            return of<Any>(code, message, null)
        }

        fun ofSuccess(): ApiResponse<*> {
            return of(200, "success")
        }

        fun <T> ofSuccessWithDate(date: T): ApiResponse<T> {
            return of(200, "success", date)
        }

        fun ofException(e: SystemProcessingException): ApiResponse<*> {
            return of(e.code, e.msg)
        }

        fun ofErrorEnum(e: ExceptionEnum): ApiResponse<*> {
            return of(e.code, e.message)
        }
    }
}