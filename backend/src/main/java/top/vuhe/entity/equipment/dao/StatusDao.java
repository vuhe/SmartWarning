package top.vuhe.entity.equipment.dao;

import lombok.Data;
import lombok.EqualsAndHashCode;
import top.vuhe.entity.BaseEntity;

/**
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class StatusDao extends BaseEntity {
    private String statusName;
    private Color statusColor;

    public enum Color {
        // 灰色
        Gray,
        // 绿色
        Green,
        // 黄色
        Yellow,
        // 红色
        Red
    }
}
