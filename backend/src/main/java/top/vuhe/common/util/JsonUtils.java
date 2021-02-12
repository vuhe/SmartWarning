package top.vuhe.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

/**
 * @author zhuhe
 */
@Slf4j
public final class JsonUtils {
    private final static ObjectMapper OBJ_MAPPER = new ObjectMapper();

    /**
     * Json 字符串转化成对象
     *
     * @param jsonString json 字符串
     * @param clazz      类型实例
     * @param <T>        目前类
     * @return 目标类
     */
    public static <T> T toObj(String jsonString, Class<T> clazz) {
        OBJ_MAPPER.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
        try {
            return OBJ_MAPPER.readValue(jsonString, clazz);
        } catch (IOException e) {
            log.error("Json字符串转化成对象出错", e);
        }
        return null;
    }

    /**
     * javaBean 转化成json字符串
     *
     * @param obj 对象
     * @return json 字符串
     */
    public static String toJson(Object obj) {
        if (obj instanceof Integer || obj instanceof Long || obj instanceof Float ||
                obj instanceof Double || obj instanceof Boolean || obj instanceof String) {
            return String.valueOf(obj);
        }
        try {
            return OBJ_MAPPER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("转化成json字符串出错", e);
        }
        return null;
    }
}
