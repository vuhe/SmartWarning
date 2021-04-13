package top.vuhe.sw.entity.auth

import org.springframework.security.core.GrantedAuthority

/**
 * 用户权限角色
 */
enum class UserRole : GrantedAuthority {
    // 管理员
    Admin,

    // 普通用户
    User;

    override fun getAuthority(): String? {
        return "ROLE_" + toString()
    }
}