package top.vuhe.auth;

import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.vuhe.entity.User;
import top.vuhe.portal.service.intf.UserService;

import java.util.HashSet;
import java.util.Set;

/**
 * @author zhuhe
 */
@Component
public class OAuth2Realm extends AuthorizingRealm {
    @Autowired
    UserService userService;

    /**
     * 授权(验证权限时调用)
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        User user = (User) principals.getPrimaryPrincipal();

        // 用户权限列表
        Set<String> permsSet = new HashSet<>() {{
            add(User.Role.User.toString());
        }};
        // 管理员具有高级权限角色
        if (user.getRole() == User.Role.Admin) {
            permsSet.add(User.Role.Admin.toString());
        }

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.setStringPermissions(permsSet);
        return info;
    }

    /**
     * 认证(登录时调用)
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String accessToken = (String) token.getPrincipal();

        // 根据 accessToken，查询用户
        User user = userService.getUserByToken(accessToken);
        // 找不到用户
        if (user == null) {
            throw new IncorrectCredentialsException("token失效，请重新登录");
        }

        return new SimpleAuthenticationInfo(user, accessToken, getName());
    }
}
