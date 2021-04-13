package top.vuhe.sw.config

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.auth.JsonLoginFilter
import top.vuhe.sw.auth.JwtTokenFilter
import top.vuhe.sw.common.exception.ExceptionEnum
import top.vuhe.sw.common.util.send
import top.vuhe.sw.portal.service.UserLogService
import javax.servlet.http.HttpServletResponse

/**
 * ## 鉴权配置
 *
 * @author vuhe
 */
@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
    companion object {
        private val log = LoggerFactory.getLogger(SecurityConfig::class.java)

        /**
         * 需要放行的URL
         */
        val authWhitelist = arrayOf(
            "/websocket"
        )
    }

    /**
     * 用于鉴权
     */
    @Autowired
    @Qualifier("UserService")
    private lateinit var userService: UserDetailsService

    /**
     * 用于记录日志
     */
    @Autowired
    private lateinit var userLogService: UserLogService

    @Bean
    fun bCryptPasswordEncoder(): BCryptPasswordEncoder? {
        return BCryptPasswordEncoder()
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        // 所有请求都需要身份验证，关闭 CSRF
        http.cors().and()
            .csrf().disable()
            // 基于token，所以不需要session
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeRequests()
            // 可以匿名访问的链接
            .antMatchers(*authWhitelist).permitAll()
            // 需要 管理员 权限
            .antMatchers("/user/**").hasRole("Admin")
            // 其它全部需要认证访问
            .anyRequest().authenticated()
            .and()
            .addFilter(JwtTokenFilter(authenticationManager()))

        // 配置 AuthenticationFilter
        val authenticationFilter = JsonLoginFilter()
        authenticationFilter.init(authenticationManagerBean(), userLogService)

        // 添加过滤器
        http.addFilterAt(authenticationFilter, UsernamePasswordAuthenticationFilter::class.java)

        // 配置认证异常处理
        http.exceptionHandling()
            .authenticationEntryPoint { _, response: HttpServletResponse, _ ->
                send(
                    response,
                    ApiResponse.ofErrorEnum(ExceptionEnum.INVALID_TOKEN)
                )
            }
        // 配置权限异常处理
        http.exceptionHandling()
            .accessDeniedHandler { _, response: HttpServletResponse, _ ->
                send(
                    response,
                    ApiResponse.ofErrorEnum(ExceptionEnum.PERMISSION_ERROR)
                )
            }
    }

    @Throws(Exception::class)
    override fun configure(auth: AuthenticationManagerBuilder) {
        // 将 userService 设置到 AuthenticationManagerBuilder
        auth.userDetailsService(userService)
    }
}