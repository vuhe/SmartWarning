package top.vuhe.sw.common.util

import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import top.vuhe.sw.common.ApiResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

fun getHttpServletRequest(): HttpServletRequest {
    val requestAttributes = RequestContextHolder.getRequestAttributes()
    requireNotNull(requestAttributes) {
        "RequestAttributes is null!"
    }
    return (requestAttributes as ServletRequestAttributes).request
}

fun getDomain(): String {
    val request = getHttpServletRequest()
    val url = request.requestURL
    return url.delete(url.length - request.requestURI.length, url.length).toString()
}

fun getOrigin(): String? {
    val request = getHttpServletRequest()
    return request.getHeader("Origin")
}

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