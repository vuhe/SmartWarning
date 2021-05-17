package top.vuhe.sw.common.util

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.data.redis.core.ListOperations
import org.springframework.stereotype.Component

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

val beanUtil = SpringUtils.getUtilBean()

val utilLog: Logger = LoggerFactory.getLogger(BeanUtil::class.java)