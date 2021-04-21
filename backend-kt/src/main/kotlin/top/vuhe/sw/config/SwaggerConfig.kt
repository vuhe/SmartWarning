package top.vuhe.sw.config

import io.swagger.annotations.ApiOperation
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.core.env.Profiles
import springfox.documentation.builders.ApiInfoBuilder
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.oas.annotations.EnableOpenApi
import springfox.documentation.service.ApiInfo
import springfox.documentation.service.ApiKey
import springfox.documentation.service.Contact
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket


@Configuration
@EnableOpenApi
class SwaggerConfig {
    @Bean
    fun initDocket(env: Environment): Docket {
        //设置要暴漏接口文档的配置环境
        val profile: Profiles = Profiles.of("dev", "test")
        val flag: Boolean = env.acceptsProfiles(profile)
        return Docket(DocumentationType.OAS_30)
            .apiInfo(apiInfo())
            .enable(flag)
            .select()
            .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation::class.java))
            .paths(PathSelectors.any())
            .build()
            .securitySchemes(security())
    }

    private fun apiInfo(): ApiInfo {
        return ApiInfoBuilder()
            .title("智慧电气预警系统 接口文档")
            .description("技术支持：朱赫、陈亦航")
            .termsOfServiceUrl("https://sw.zhuhe.site")
            .contact(Contact("刘龙涛技术团队", "https://sw.zhuhe.site", "zhuhe202@qq.com"))
            .version("1.0")
            .build()
    }

    private fun security(): List<ApiKey> {
        return arrayListOf(
            ApiKey("Authorization", "token", "header")
        )
    }
}