package top.vuhe.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

/**
 * 设备信息
 *
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "device_info")
public class DeviceInfo extends BaseEntity {
    /**
     * 设备名称
     */
    @TableField(value = "device_name")
    private String deviceName;
    /**
     * 设备型号
     */
    @TableField(value = "device_model")
    private String deviceModel;
    /**
     * 创建日期
     */
    @TableField(value = "create_date")
    private Date createDate;
}
