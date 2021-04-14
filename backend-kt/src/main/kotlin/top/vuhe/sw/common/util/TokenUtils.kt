package top.vuhe.sw.common.util

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import top.vuhe.sw.entity.auth.User
import top.vuhe.sw.entity.auth.UserRole
import java.util.*
import javax.crypto.SecretKey

/**
 * 过期时间---24 hour
 */
private const val EXPIRATION_TIME = 60 * 60 * 24

/**
 * 前缀
 */
const val TOKEN_PREFIX = "SW "

/**
 * 表头授权
 */
const val AUTHORIZATION = "Authorization"

fun generateToken(user: User): String {
    val calendar = Calendar.getInstance()
    val now = calendar.time
    // 设置签发时间
    calendar.time = Date()
    // 设置过期时间
    // 添加秒钟
    calendar.add(Calendar.SECOND, EXPIRATION_TIME)
    val time = calendar.time
    val map = HashMap<String, String?>(2)
    map["username"] = user.username
    map["role"] = user.role.toString()
    val jwt = Jwts.builder()
        .setClaims(map) //签发时间
        .setIssuedAt(now) //过期时间
        .setExpiration(time)
        .signWith(generalKey())
        .compact()
    //jwt前面一般都会加Bearer
    return TOKEN_PREFIX + jwt
}

fun validateToken(token: String): User {
    // parse the token.
    val body: Map<String, Any> = Jwts.parserBuilder()
        .setSigningKey(generalKey())
        .build()
        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
        .body
    return if (UserRole.Admin.toString() == body["role"].toString()) {
        User(id = null, username = body["username"].toString(), password = "", UserRole.Admin)
    } else {
        User(id = null, username = body["username"].toString(), password = "", UserRole.User)
    }
}

private fun generalKey(): SecretKey {
    return Keys.hmacShaKeyFor(
        Decoders.BASE64.decode("023bdc63c3c5a45879ee6581508b9d03ad39a74fc0c9a9cce604743367c9646b")
    )
}