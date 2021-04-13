package top.vuhe.sw.common

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import top.vuhe.sw.common.exception.ExceptionEnum
import top.vuhe.sw.common.exception.SystemProcessingException

/**
 * 通用返回类
 *
 * @author zhuhe
 */
@JsonSerialize(using = ApiResponseSerializer::class)
class ApiResponse<T> private constructor(
    val code: Int,
    val message: String,
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