package top.vuhe.sw.common.util

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.data.redis.core.ListOperations
import org.springframework.stereotype.Component
import top.vuhe.sw.entity.RiskFactorValue

typealias IOException = java.io.IOException
typealias UUID = java.util.UUID
typealias Calendar = java.util.Calendar
typealias Date = java.util.Date
typealias LinkedList<T> = java.util.LinkedList<T>
typealias RedisValue = RiskFactorValue
typealias DateFormat = java.text.DateFormat

val beanUtil = SpringUtils.getUtilBean()
val utilLog: Logger = LoggerFactory.getLogger(BeanUtil::class.java)

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
annotation class Slf4j{
    companion object{
        val <reified T> T.log: Logger
            inline get() = LoggerFactory.getLogger(T::class.java)
    }
}

@Component
class SpringUtils : ApplicationContextAware {
    companion object {
        private lateinit var context: ApplicationContext

        fun getUtilBean(): BeanUtil {
            return context.getBean("SwBeanUtil", BeanUtil::class.java)
        }
    }

    override fun setApplicationContext(applicationContext: ApplicationContext) {
        context = applicationContext
    }
}

@Component("SwBeanUtil")
class BeanUtil @Autowired constructor(
    val listOperations: ListOperations<String, String>,
    val rabbitTemplate: RabbitTemplate
)
