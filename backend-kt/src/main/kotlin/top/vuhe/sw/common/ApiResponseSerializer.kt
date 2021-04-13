package top.vuhe.sw.common

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer

/**
 * 序列化 通用返回类
 *
 * @author zhuhe
 */
class ApiResponseSerializer : StdSerializer<ApiResponse<*>> {

    constructor() : this(null)

    constructor(t: Class<ApiResponse<*>>?) : super(t)

    override fun serialize(
        value: ApiResponse<*>,
        gen: JsonGenerator,
        provider: SerializerProvider?
    ) {
        gen.writeStartObject()
        gen.writeNumberField("code", value.code)
        gen.writeStringField("message", value.message)
        if (value.data != null) {
            gen.writeObjectField("data", value.data)
        }
        gen.writeEndObject()
    }

}