package top.vuhe.sw.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

/**
 * ## 跨域配置
 *
 * @author vuhe
 */
@Configuration
class CorsConfig {
    @Bean
    fun corsFilter(): CorsFilter? {
        val config = CorsConfiguration()
        config.addAllowedOrigin("*")
        config.allowCredentials = true
        config.addAllowedMethod("*")
        config.addAllowedHeader("*")
        val configSource = UrlBasedCorsConfigurationSource()
        configSource.registerCorsConfiguration("/**", config)
        return CorsFilter(configSource)
    }
}