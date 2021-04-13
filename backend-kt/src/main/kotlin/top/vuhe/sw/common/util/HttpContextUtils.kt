package top.vuhe.sw.common.util

import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.*
import javax.servlet.http.HttpServletRequest

fun getHttpServletRequest(): HttpServletRequest {
    return (Objects.requireNonNull(RequestContextHolder.getRequestAttributes()) as ServletRequestAttributes).request
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