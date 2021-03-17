package top.vuhe.drive;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import top.vuhe.drive.netty.NettyServer;

import javax.annotation.PreDestroy;

/**
 * @author zhuhe
 */
@Slf4j
@Component
@Order(value = 1)
public class NettyStarter implements CommandLineRunner {
    @Value("${netty.port}")
    private Integer port;

    /**
     * 注意，组件启动时会执行run，注解 Async 是让线程异步执行，这样不影响主线程
     *
     * @param args
     */
    @Async
    @Override
    public void run(String... args) {
        try {
            log.info("Netty started on port(s): " + port + " (tcp)");
            NettyServer.getInstance().start(port);
        } catch (Exception e) {
            log.error("Netty start error", e);
        }
    }

    @PreDestroy
    public void destroy() {
        try {
            NettyServer.getInstance().destroy();
        } catch (Exception e) {
            log.error("Netty destroy error", e);
        }
    }

}
