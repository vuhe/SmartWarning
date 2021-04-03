package top.vuhe.auth;

import org.apache.shiro.authc.AuthenticationToken;

/**
 * Shiro 认证类
 * <p>
 * 实现 Token
 *
 * @author zhuhe
 */
public class OAuth2Token implements AuthenticationToken {
    private final String token;

    public OAuth2Token(String token) {
        this.token = token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }
}
