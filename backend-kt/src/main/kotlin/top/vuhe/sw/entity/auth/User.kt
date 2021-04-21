package top.vuhe.sw.entity.auth

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import com.fasterxml.jackson.annotation.JsonIgnore
import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
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
@ApiModel(value ="用户")
@TableName(value = "user")
data class User(
    @field:JsonIgnore
    @field:TableId(value = "id", type = IdType.AUTO)
    @field:ApiModelProperty(hidden = true)
    val id: Int?,
    @field:ApiModelProperty(value = "用户名")
    private val username: String,
    @field:ApiModelProperty(value = "密码")
    private val password: String,
    @field:ApiModelProperty(value = "用户角色", dataType = "String", allowableValues = "User, Admin", example = "User")
    val role: UserRole = UserRole.User
) : UserDetails {
    @ApiModelProperty(hidden = true)
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
    @ApiModelProperty(hidden = true)
    override fun isAccountNonExpired(): Boolean {
        return true
    }

    /**
     * 账户是否锁定
     */
    @JsonIgnore
    @ApiModelProperty(hidden = true)
    override fun isAccountNonLocked(): Boolean {
        return true
    }

    /**
     * 账号凭证是否未过期
     */
    @JsonIgnore
    @ApiModelProperty(hidden = true)
    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    /**
     * 是否使用
     */
    @JsonIgnore
    @ApiModelProperty(hidden = true)
    override fun isEnabled(): Boolean {
        return true
    }

}
