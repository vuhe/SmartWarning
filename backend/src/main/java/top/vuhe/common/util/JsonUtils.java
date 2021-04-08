package top.vuhe.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zhuhe
 */
@Slf4j
public final class JsonUtils {
    private final static ObjectMapper OBJ_MAPPER = new ObjectMapper();

    private JsonUtils() {
        throw new UnsupportedOperationException("Can't instantiation!");
    }

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
     * Json 字符串转化成 Map
     *
     * @param src 输入流
     * @return 目标 Map
     */
    @SuppressWarnings("unchecked")
    public static Map<String, String> requestToMap(HttpServletRequest src) {
        try {
            return OBJ_MAPPER.readValue(src.getInputStream(), Map.class);
        } catch (IOException e) {
            log.error("从Request提取Json字符串转换成Map出错", e);
        }
        return new HashMap<>(5);
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
