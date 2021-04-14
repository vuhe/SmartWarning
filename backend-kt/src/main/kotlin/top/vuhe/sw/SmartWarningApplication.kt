package top.vuhe.sw

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableAsync

@EnableAsync
@SpringBootApplication
class SmartWarningApplication

fun main(args: Array<String>) {
    runApplication<SmartWarningApplication>(*args)
}
