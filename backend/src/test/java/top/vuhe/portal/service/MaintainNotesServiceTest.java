package top.vuhe.portal.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import top.vuhe.portal.service.intf.MaintainNotesService;

@SpringBootTest
public class MaintainNotesServiceTest {
    @Autowired
    private MaintainNotesService maintainNotesService;

    @Test
    void test1() {
        System.out.println(maintainNotesService.getMaintainNotesById(1));
    }
}
