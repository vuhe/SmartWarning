package top.vuhe.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import top.vuhe.common.ApiResponse;
import top.vuhe.common.exception.ExceptionEnum;
import top.vuhe.common.util.JsonUtils;
import top.vuhe.common.util.ResponseUtils;
import top.vuhe.common.util.TokenUtils;
import top.vuhe.entity.User;
import top.vuhe.portal.service.intf.UserLogService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 登录认证 Filter
 * <p>
 * 使用 Json 登录
 *
 * @author zhuhe
 */
@Slf4j
public class JsonLoginFilter extends UsernamePasswordAuthenticationFilter {
    private static final String POST = "POST";

    public void init(AuthenticationManager authenticationManager, UserLogService userLogService) {
        setAuthenticationManager(authenticationManager);
        // 登录成功处理器
        setAuthenticationSuccessHandler((request, response, authentication) -> {
            User user = (User) authentication.getPrincipal();
            String token = TokenUtils.generateToken(user);
            ResponseUtils.send(response, ApiResponse.ofSuccessWithDate(token));
            userLogService.insertLogByUserId(user.getId(), "用户登录成功");
        });
        // 登录失败处理器
        setAuthenticationFailureHandler((request, response, exception) -> {
            Throwable throwable = exception.getCause() == null ? exception : exception.getCause();
            ApiResponse<?> r;
            if (exception instanceof BadCredentialsException) {
                r = ApiResponse.ofErrorEnum(ExceptionEnum.LOGIN_ERROR);
            } else {
                r = ApiResponse.of(ExceptionEnum.LOGIN_ERROR.getCode(), throwable.getMessage());
            }
            ResponseUtils.send(response, r);
        });
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        if (!POST.equals(request.getMethod())) {
            throw new AuthenticationServiceException(
                    "Authentication method not supported: " + request.getMethod());
        }

        // 判断 ContentType 类型
        if (request.getContentType().contains(MediaType.APPLICATION_JSON_VALUE)) {

            // 获取请求内容
            Map<String, String> loginData = JsonUtils.requestToMap(request);

            // 获取用户名和密码
            String username = loginData.get(getUsernameParameter());
            String password = loginData.get(getPasswordParameter());

            // 创建 Authentication
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(username, password);
            setDetails(request, authentication);

            // 执行身份验证
            return this.getAuthenticationManager().authenticate(authentication);
        } else {
            throw new AuthenticationServiceException(
                    "Authentication content type not supported: " + request.getContentType());
        }
    }
}
