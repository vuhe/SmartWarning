package top.vuhe.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;

/**
 * @author zhuhe
 */
@Data
public class BaseEntity {
    /**
     * 主键
     */
    @Id
    @JsonIgnore
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
}
