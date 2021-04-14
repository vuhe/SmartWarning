package top.vuhe.sw.common.util

import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component

@Component
class SpringUtils : ApplicationContextAware {
    companion object {
        private lateinit var context: ApplicationContext

        @SuppressWarnings("unchecked")
        fun <T> getBean(id: String, type: Class<T>?): T {
            return context.getBean(id, type) as T
        }
    }

    override fun setApplicationContext(applicationContext: ApplicationContext) {
        context = applicationContext
    }
}