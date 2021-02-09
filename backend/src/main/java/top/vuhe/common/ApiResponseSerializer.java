package top.vuhe.common;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

/**
 * 序列化 通用返回类
 *
 * @author zhuhe
 */
public class ApiResponseSerializer extends StdSerializer<ApiResponse<?>> {
    public ApiResponseSerializer() {
        this(null);
    }

    public ApiResponseSerializer(Class<ApiResponse<?>> t) {
        super(t);
    }

    @Override
    public void serialize(ApiResponse<?> value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeNumberField("code", value.getCode());
        gen.writeStringField("message", value.getMessage());
        if (value.getData() != null) {
            gen.writeObjectField(value.getDataName(), value.getData());
        }
        gen.writeEndObject();
    }
}
