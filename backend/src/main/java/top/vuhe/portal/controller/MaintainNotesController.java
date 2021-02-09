package top.vuhe.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import top.vuhe.common.ApiResponse;
import top.vuhe.entity.MaintainNotes;
import top.vuhe.portal.service.intf.MaintainNotesService;

/**
 * @author zhuhe
 */
@RestController
@RequestMapping("/maintain_notes")
public class MaintainNotesController {
    @Autowired
    private MaintainNotesService service;

    /**
     * 通过 id 获取维护信息
     *
     * @param id id
     * @return 维护信息
     */
    @GetMapping("/get")
    public ApiResponse<MaintainNotes> getMaintainNotesById(@RequestParam("id") Integer id) {
        return ApiResponse.ofSuccessWithDate("data", service.getMaintainNotesById(id));
    }
}
