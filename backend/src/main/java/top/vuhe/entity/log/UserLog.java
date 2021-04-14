package top.vuhe.entity.log;

import lombok.Data;
import lombok.EqualsAndHashCode;
import top.vuhe.entity.BaseEntity;

import java.util.Date;

/**
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class UserLog extends BaseEntity {
    private Date changeTime;
    private String operationDetail;
}
