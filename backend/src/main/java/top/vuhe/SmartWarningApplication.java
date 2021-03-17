package top.vuhe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * @author zhuhe
 */
@EnableAsync
@SpringBootApplication
public class SmartWarningApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartWarningApplication.class, args);
    }

}
