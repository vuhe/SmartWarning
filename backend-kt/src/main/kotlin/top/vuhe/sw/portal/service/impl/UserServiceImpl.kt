package top.vuhe.sw.portal.service.impl

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.common.exception.ExceptionEnum
import top.vuhe.sw.entity.User
import top.vuhe.sw.mapper.UserMapper
import top.vuhe.sw.portal.service.UserService

@Service("UserService")
class UserServiceImpl :
    ServiceImpl<UserMapper, User>(), UserService, UserDetailsService {
    private val encoder = BCryptPasswordEncoder()

    override fun getUserList(): List<User> {
        val username = SecurityContextHolder.getContext().authentication.principal as String
        val queryWrapper = QueryWrapper<User>()
        queryWrapper.ne("username", username)
        return list(queryWrapper)
    }

    override fun saveUser(user: User, isModify: Boolean): ApiResponse<*> {
        val u = user.copy(
            id = null,
            password = encoder.encode(user.password.trim())
        )

        if (isModify) {
            val updateWrapper = UpdateWrapper<User>()
            updateWrapper.eq("username", user.username)
            if (update(u, updateWrapper).not()) {
                return ApiResponse.ofErrorEnum(ExceptionEnum.USERNAME_ERROR)
            }
        } else {
            if (save(u).not()) {
                return ApiResponse.ofErrorEnum(ExceptionEnum.DATA_ERROR)
            }
        }

        return ApiResponse.ofSuccess()
    }

    override fun deleteUser(user: User): ApiResponse<*> {
        val queryWrapper = QueryWrapper<User>()
        queryWrapper.eq("username", user.username)
        return if (remove(queryWrapper)) ApiResponse.ofSuccess()
        else ApiResponse.ofErrorEnum(ExceptionEnum.USERNAME_ERROR)
    }

    override fun loadUserByUsername(username: String?): UserDetails {
        // 向数据库查询用户
        val queryWrapper = QueryWrapper<User>()
        queryWrapper.eq("username", username)
            .last("LIMIT 1")

        // 检查用户是否存在
        return getOne(queryWrapper) ?: throw UsernameNotFoundException("用户不存在")
    }
}