package top.vuhe.entity.equipment.dao;

import lombok.*;
import top.vuhe.entity.BaseEntity;

/**
 * 状态
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class ChannelDao extends BaseEntity {
    private String perUnit;
    private Integer currentState;
    private Integer currentValue;
    private String channelName;
}
