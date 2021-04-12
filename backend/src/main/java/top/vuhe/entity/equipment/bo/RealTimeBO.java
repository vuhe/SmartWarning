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
public class RealTimeBO implements ElectricInfo {
    private static final int HEAD_LEN = 2;
    private static final int ROW_LEN = 3;
    private final List<StatusDTO> status;
    private final Map<Integer, Double> values;

    public RealTimeBO(List<Byte> bytes) {
        if (bytes.size() < HEAD_LEN ||
                (bytes.size() - HEAD_LEN) % ROW_LEN != 0) {
            throw new IllegalArgumentException("读取byte时出错");
        }
        Iterator<Byte> it = bytes.iterator();
        // 初始化状态List
        List<StatusDTO> statusList = new LinkedList<>();
        statusList.add(new StatusDTO(51, (int) it.next()));
        // 初始化值List
        Map<Integer, Double> valueMap = new HashMap<>(52);
        // 设置信号强度
        valueMap.put(52, (double) it.next());
        // 存储实时值
        int length = (bytes.size() - HEAD_LEN) / ROW_LEN;
        for (int i = 0; i < length; i++) {
            int channel = it.next();
            int value = it.next();
            value = value << 8 + it.next();
            if (value == 0xFFFF) {
                statusList.add(new StatusDTO(channel, 0));
            } else {
                valueMap.put(channel, value * 1.0 / 10);
            }
        }
        status = Collections.unmodifiableList(statusList);
        values = Collections.unmodifiableMap(valueMap);
    }

    @Override
    public Map<Integer, Double> getRealTimeDTO() {
        return values;
    }

    @Override
    public List<StatusDTO> getStatusDTO() {
        return status;
    }

    @Override
    public List<ThresholdDTO> getThresholdDTO() {
        return null;
    }
}
