package top.vuhe.auth;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import top.vuhe.common.ApiResponse;
import top.vuhe.common.exception.ExceptionEnum;
import top.vuhe.common.util.ResponseUtils;
import top.vuhe.common.util.TokenUtils;
import top.vuhe.config.SecurityConfig;
import top.vuhe.entity.auth.User;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

/**
 * token 认证 Filter
 * <p>
 * 使用token登录(验证用户)
 *
 * @author zhuhe
 */
@Slf4j
public class JwtTokenFilter extends BasicAuthenticationFilter {
    public JwtTokenFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String url = request.getRequestURI();
        String header = request.getHeader(TokenUtils.AUTHORIZATION);

        //跳过不需要验证的路径
        if (Arrays.asList(SecurityConfig.AUTH_WHITELIST).contains(url)) {
            chain.doFilter(request, response);
            return;
        }

        if (StringUtils.isBlank(header) || !header.startsWith(TokenUtils.TOKEN_PREFIX)) {
            ResponseUtils.send(response, ApiResponse.ofErrorEnum(ExceptionEnum.INVALID_TOKEN));
            return;
        }
        try {
            UsernamePasswordAuthenticationToken authentication = getAuthentication(request);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } catch (Exception e) {
            ResponseUtils.send(response, ApiResponse.ofErrorEnum(ExceptionEnum.INVALID_TOKEN));
            logger.error("Invalid Token " + e.getMessage());
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(TokenUtils.AUTHORIZATION);
        if (token != null) {
            // 解密Token
            try {
                User user = TokenUtils.validateToken(token);
                return new UsernamePasswordAuthenticationToken(
                        user.getUsername(), null, user.getAuthorities());
            } catch (Exception e) {
                throw new RuntimeException("Invalid Token", e);
            }
        }
        return null;
    }
}
