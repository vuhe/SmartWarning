package top.vuhe.portal.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import top.vuhe.portal.service.intf.UserService;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    void test() {
        System.out.println(userService.getUserInfoById(1));
    }
}
