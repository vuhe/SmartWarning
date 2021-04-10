package top.vuhe.entity;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author zhuhe
 */
public enum UserRole implements GrantedAuthority {
    // 管理员
    Admin,
    // 普通用户
    User;

    @Override
    public String getAuthority() {
        return "ROLE_" + toString();
    }
}
