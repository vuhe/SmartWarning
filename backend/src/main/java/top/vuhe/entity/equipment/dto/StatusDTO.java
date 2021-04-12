package top.vuhe.entity.equipment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author zhuhe
 */
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class StatusDTO {
    /**
     * 通道号
     */
    private Integer channel;
    /**
     * 状态号
     * <p>
     * 此号需要有状态值对应
     */
    private Integer status;
}
