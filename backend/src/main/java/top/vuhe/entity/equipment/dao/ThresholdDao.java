package top.vuhe.entity.equipment.dao;

import lombok.Data;
import lombok.EqualsAndHashCode;
import top.vuhe.entity.BaseEntity;

/**
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class ThresholdDao extends BaseEntity {
    private Integer channelId;
    private Integer statusId;
    private Integer thresholdValue;
}
