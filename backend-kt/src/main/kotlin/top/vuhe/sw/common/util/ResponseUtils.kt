package top.vuhe.sw.common.util

import top.vuhe.sw.common.ApiResponse
import javax.servlet.http.HttpServletResponse

fun send(response: HttpServletResponse, data: ApiResponse<*>) {
    response.characterEncoding = "UTF-8"
    response.contentType = "application/json; charset=utf-8"
    response.setHeader("Access-Control-Allow-Credentials", "true")
    response.setHeader("Access-Control-Allow-Origin", getOrigin())
    response.writer.use { out ->
        out.append(toJson(data))
        out.flush()
    }
}