package top.vuhe.common.util;

import lombok.extern.slf4j.Slf4j;
import top.vuhe.common.ApiResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * @author zhuhe
 */
@Slf4j
public final class ResponseUtils {
    private ResponseUtils() {
        throw new UnsupportedOperationException("Can't instantiation!");
    }

    public static void send(HttpServletResponse response, ApiResponse<?> data) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Origin", HttpContextUtils.getOrigin());

        try (PrintWriter out = response.getWriter()) {
            out.append(JsonUtils.toJson(data));
            out.flush();
        } catch (Exception e) {
            log.error("权限验证结果返回时，转换http信息出错", e);
        }
    }
}
