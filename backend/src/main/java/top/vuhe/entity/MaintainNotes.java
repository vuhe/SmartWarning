package top.vuhe.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * 维修信息
 *
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "maintain_notes")
public class MaintainNotes extends BaseEntity {
    /**
     * 设备 id
     */
    @TableField(value = "device_id")
    private Integer deviceId;
    /**
     * 维修日期
     */
    @TableField(value = "modify_date")
    private Date modifyDate;
}
