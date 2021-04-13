package top.vuhe.sw.auth

import com.baomidou.mybatisplus.core.toolkit.StringUtils
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.common.exception.ExceptionEnum
import top.vuhe.sw.common.util.*
import top.vuhe.sw.config.SecurityConfig
import java.io.IOException
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtTokenFilter(authenticationManager: AuthenticationManager) :
    BasicAuthenticationFilter(authenticationManager) {
    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val url = request.requestURI
        val header = request.getHeader(AUTHORIZATION)

        //跳过不需要验证的路径
        if (listOf<Any>(SecurityConfig.authWhitelist).contains(url)) {
            chain.doFilter(request, response)
            return
        }
        if (StringUtils.isBlank(header) || !header.startsWith(TOKEN_PREFIX)) {
            send(response, ApiResponse.ofErrorEnum(ExceptionEnum.INVALID_TOKEN))
            return
        }
        try {
            val authentication = getAuthentication(request)
            SecurityContextHolder.getContext().authentication = authentication
            chain.doFilter(request, response)
        } catch (e: Exception) {
            send(response, ApiResponse.ofErrorEnum(ExceptionEnum.INVALID_TOKEN))
            logger.error("Invalid Token " + e.message)
        }
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(AUTHORIZATION)
        return if (token != null) {
            // 解密Token
            try {
                val user = validateToken(token)
                UsernamePasswordAuthenticationToken(
                    user.username, null, user.authorities
                )
            } catch (e: Exception) {
                throw RuntimeException("Invalid Token", e)
            }
        } else null
    }
}