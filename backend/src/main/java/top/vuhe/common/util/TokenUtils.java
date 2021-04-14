package top.vuhe.common.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import top.vuhe.entity.auth.User;
import top.vuhe.entity.auth.UserRole;

import javax.crypto.SecretKey;
import java.util.*;

/**
 * @author zhuhe
 */
@Slf4j
public final class TokenUtils {
    /**
     * 过期时间---24 hour
     */
    private static final int EXPIRATION_TIME = 60 * 60 * 24;
    /**
     * 前缀
     */
    public static final String TOKEN_PREFIX = "SW ";
    /**
     * 表头授权
     */
    public static final String AUTHORIZATION = "Authorization";

    private TokenUtils() {
        throw new UnsupportedOperationException("Can't instantiation!");
    }

    public static String generateToken(User user) {
        Calendar calendar = Calendar.getInstance();
        Date now = calendar.getTime();
        // 设置签发时间
        calendar.setTime(new Date());
        // 设置过期时间
        // 添加秒钟
        calendar.add(Calendar.SECOND, EXPIRATION_TIME);
        Date time = calendar.getTime();
        HashMap<String, String> map = new HashMap<>(2);
        map.put("username", user.getUsername());
        map.put("role", user.getRole().toString());
        String jwt = Jwts.builder()
                .setClaims(map)
                //签发时间
                .setIssuedAt(now)
                //过期时间
                .setExpiration(time)
                .signWith(generalKey())
                .compact();
        //jwt前面一般都会加Bearer
        return TOKEN_PREFIX + jwt;
    }

    public static User validateToken(String token) {
        // parse the token.
        Map<String, Object> body = Jwts.parserBuilder()
                .setSigningKey(generalKey())
                .build()
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody();
        User user = new User();
        user.setUsername(body.get("username").toString());
        if (UserRole.Admin.toString().equals(body.get("role").toString())) {
            user.setRole(UserRole.Admin);
        }
        return user;
    }

    private static SecretKey generalKey(){
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode("023bdc63c3c5a45879ee6581508b9d03ad39a74fc0c9a9cce604743367c9646b"));
    }
}
