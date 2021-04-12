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
public class RealTimeDTO {
    private Integer channel;
    private Double value;
}
