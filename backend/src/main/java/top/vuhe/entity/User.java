package top.vuhe.entity;

import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 用户
 *
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "user")
public class User extends BaseEntity {
    /**
     * 用户名
     */
    @TableField(value = "username")
    private String username;
    /**
     * 密码
     */
    @TableField(value = "password")
    private String password;
    /**
     * 角色
     */
    private Role role;
    /**
     * token
     */
    @TableField(
            insertStrategy = FieldStrategy.IGNORED,
            updateStrategy = FieldStrategy.IGNORED)
    private String token;

    public enum Role {
        // 管理员
        Admin,
        // 普通用户
        User
    }
}
