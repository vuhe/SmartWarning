package top.vuhe.sw.portal.service

import com.baomidou.mybatisplus.extension.service.IService
import top.vuhe.sw.common.ApiResponse
import top.vuhe.sw.entity.auth.User

interface UserService : IService<User> {
    /**
     * 按 id 获取 User
     *
     * @return User
     */
    fun getUserList(): List<User>

    /**
     * 修改/添加一个用户
     *
     * @param user     修改/添加信息
     * @param isModify 是否是修改
     * @return 是否成功
     */
    fun saveUser(user: User, isModify: Boolean): ApiResponse<*>

    /**
     * 删除一个用户
     *
     * @param user 删除信息
     * @return 是否成功
     */
    fun deleteUser(user: User): ApiResponse<*>
}