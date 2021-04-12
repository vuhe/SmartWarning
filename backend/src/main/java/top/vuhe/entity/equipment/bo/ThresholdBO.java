package top.vuhe.entity.equipment.bo;

import lombok.Data;
import top.vuhe.entity.equipment.ElectricInfo;
import top.vuhe.entity.equipment.dto.StatusDTO;
import top.vuhe.entity.equipment.dto.ThresholdDTO;

import java.util.*;

/**
 * @author zhuhe
 */
@Data
public class ThresholdBO implements ElectricInfo {
    private static final int ROW_LEN = 3;
    private final List<StatusDTO> status;
    private final List<ThresholdDTO> thresholds;
    private final Map<Integer, Integer> data = new HashMap<>();

    public ThresholdBO(List<Byte> bytes) {
        if (bytes.size() % ROW_LEN != 0) {
            throw new IllegalArgumentException("读取byte时出错");
        }
        Iterator<Byte> it = bytes.iterator();
        // 初始化List
        List<StatusDTO> statusList = new LinkedList<>();
        List<ThresholdDTO> thresholdList = new LinkedList<>();
        // 存储实时值
        int length = bytes.size() / ROW_LEN;
        for (int i = 0; i < length; i++) {
            int channel = it.next();
            int value = it.next();
            value = value << 8 + it.next();
            if (value == 0xFFFF) {
                statusList.add(new StatusDTO(channel, 0));
            } else {
                thresholdList.add(new ThresholdDTO(channel, value));
            }
        }
        status = Collections.unmodifiableList(statusList);
        thresholds = Collections.unmodifiableList(thresholdList);
    }

    @Override
    public Map<Integer, Double> getRealTimeDTO() {
        return null;
    }

    @Override
    public List<StatusDTO> getStatusDTO() {
        return status;
    }

    @Override
    public List<ThresholdDTO> getThresholdDTO() {
        return thresholds;
    }
}
