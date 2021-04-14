package top.vuhe.entity.equipment.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import top.vuhe.entity.BaseEntity;
import top.vuhe.entity.equipment.dao.StatusDAO;

/**
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class RealTimeVO extends BaseEntity {
    private String perUnit;
    private Integer currentState;
    private String statusName;
    private StatusDAO.Color statusColor;
    private String channelName;
    private Double value;
}
