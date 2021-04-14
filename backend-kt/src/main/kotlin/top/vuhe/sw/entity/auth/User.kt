package top.vuhe.sw.entity.auth

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

/**
 * 用户信息
 *
 * @property id id
 * @property username 用户名
 * @property password 密码
 * @property role 权限角色
 */
@TableName(value = "user")
data class User(
    @field:JsonIgnore
    @field:TableId(value = "id", type = IdType.AUTO)
    val id: Int?,
    private val username: String,
    private val password: String,
    val role: UserRole = UserRole.User
) : UserDetails {
    override fun getAuthorities(): Set<GrantedAuthority> {
        return setOf<GrantedAuthority>(role)
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String {
        return username
    }

    /**
     * 账户是否过期
     */
    @JsonIgnore
    override fun isAccountNonExpired(): Boolean {
        return true
    }

    /**
     * 账户是否锁定
     */
    @JsonIgnore
    override fun isAccountNonLocked(): Boolean {
        return true
    }

    /**
     * 账号凭证是否未过期
     */
    @JsonIgnore
    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    /**
     * 是否使用
     */
    @JsonIgnore
    override fun isEnabled(): Boolean {
        return true
    }

}
