package top.vuhe.sw.auth

import org.springframework.http.MediaType
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.common.exception.ExceptionEnum
import top.vuhe.sw.common.util.generateToken
import top.vuhe.sw.common.util.requestToMap
import top.vuhe.sw.common.util.send
import top.vuhe.sw.entity.User
import top.vuhe.sw.portal.service.UserLogService
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * ## 登录认证 Filter
 * 使用 Json 登录
 *
 * @author vuhe
 */
class JsonLoginFilter : UsernamePasswordAuthenticationFilter() {
    private val post = "POST"

    fun init(authenticationManager: AuthenticationManager?, userLogService: UserLogService) {
        setAuthenticationManager(authenticationManager)
        // 登录成功处理器
        setAuthenticationSuccessHandler { _, response: HttpServletResponse, authentication: Authentication ->
            val user: User = authentication.principal as User
            val token: String = generateToken(user)
            send(response, ApiResponse.ofSuccessWithDate(token))
            userLogService.insertLogByUserId(user.id, "用户登录成功")
        }
        // 登录失败处理器
        setAuthenticationFailureHandler { _, response: HttpServletResponse, exception: AuthenticationException ->
            val throwable = if (exception.cause == null) exception else exception.cause!!
            val r: ApiResponse<*> = if (exception is BadCredentialsException || throwable.message == null) {
                ApiResponse.ofErrorEnum(ExceptionEnum.LOGIN_ERROR)
            } else {
                ApiResponse.of(ExceptionEnum.LOGIN_ERROR.code, throwable.message!!)
            }
            send(response, r)
        }
    }

    @Throws(AuthenticationException::class)
    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse?): Authentication? {
        if (post != request.method) {
            throw AuthenticationServiceException(
                "Authentication method not supported: " + request.method
            )
        }

        // 判断 ContentType 类型
        return if (request.contentType.contains(MediaType.APPLICATION_JSON_VALUE)) {

            // 获取请求内容
            val loginData: Map<String?, String?> = requestToMap(request)

            // 获取用户名和密码
            val username = loginData[usernameParameter]
            val password = loginData[passwordParameter]

            // 创建 Authentication
            val authentication = UsernamePasswordAuthenticationToken(username, password)
            setDetails(request, authentication)

            // 执行身份验证
            authenticationManager.authenticate(authentication)
        } else {
            throw AuthenticationServiceException(
                "Authentication content type not supported: " + request.contentType
            )
        }
    }
}