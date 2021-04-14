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
public class ThresholdDTO {
    private Integer channel;
    private Integer threshold;
}
