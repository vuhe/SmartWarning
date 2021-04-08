package top.vuhe.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import top.vuhe.auth.JsonLoginFilter;
import top.vuhe.auth.JwtTokenFilter;
import top.vuhe.common.ApiResponse;
import top.vuhe.common.exception.ExceptionEnum;
import top.vuhe.common.util.ResponseUtils;

/**
 * @author zhuhe
 */
@Slf4j
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    @Qualifier("UserService")
    private UserDetailsService userService;
    /**
     * 需要放行的URL
     */
    public static final String[] AUTH_WHITELIST = {
            "/websocket"
    };

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // 所有请求都需要身份验证，关闭 CSRF
        http.cors().and()
                .csrf().disable()
                // 基于token，所以不需要session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                // 可以匿名访问的链接
                .antMatchers(AUTH_WHITELIST).permitAll()
                // 需要 管理员 权限
                .antMatchers("/user/**").hasRole("Admin")
                // 其它全部需要认证访问
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtTokenFilter(authenticationManager()));

        // 配置 AuthenticationFilter
        JsonLoginFilter authenticationFilter = new JsonLoginFilter();
        authenticationFilter.init(authenticationManagerBean());

        // 添加过滤器
        http.addFilterAt(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // 配置认证异常处理
        http.exceptionHandling().authenticationEntryPoint((request, response, authException) ->
                ResponseUtils.send(response, ApiResponse.ofErrorEnum(ExceptionEnum.INVALID_TOKEN)));
        // 配置权限异常处理
        http.exceptionHandling().accessDeniedHandler((request, response, authException) ->
                ResponseUtils.send(response, ApiResponse.ofErrorEnum(ExceptionEnum.PERMISSION_ERROR)));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // 将 userService 设置到 AuthenticationManagerBuilder
        auth.userDetailsService(userService);
    }
}
