package top.vuhe.sw.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cache.CacheManager
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.cache.RedisCacheConfiguration
import org.springframework.data.redis.cache.RedisCacheManager
import org.springframework.data.redis.cache.RedisCacheWriter
import org.springframework.data.redis.connection.RedisConnectionFactory
import org.springframework.data.redis.core.*
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer
import org.springframework.data.redis.serializer.RedisSerializationContext
import org.springframework.data.redis.serializer.StringRedisSerializer
import top.vuhe.sw.common.util.RedisValue
import java.time.Duration

@EnableCaching
@Configuration("RedisConfig")
class RedisConfig @Autowired constructor(
    val redisConnectionFactory: RedisConnectionFactory
) {
    @Bean
    fun cacheManager(): CacheManager {
        return RedisCacheManager(
            RedisCacheWriter.nonLockingRedisCacheWriter(redisConnectionFactory),
            // 未配置的 key 的默认一天过期
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofDays(1))
                .serializeValuesWith(
                    RedisSerializationContext.SerializationPair.fromSerializer(
                        GenericJackson2JsonRedisSerializer()
                    )
                )
        )
    }

    @Bean
    fun listOperations(): ListOperations<String, RedisValue> {
        val redisTemplate = RedisTemplate<String, RedisValue>()
        // 设置redis主键的序列化形式
        redisTemplate.keySerializer = StringRedisSerializer()
        redisTemplate.valueSerializer = StringRedisSerializer()
        redisTemplate.hashKeySerializer = StringRedisSerializer()
        redisTemplate.hashValueSerializer = StringRedisSerializer()
        redisTemplate.setConnectionFactory(redisConnectionFactory)
        return redisTemplate.opsForList()
    }
}