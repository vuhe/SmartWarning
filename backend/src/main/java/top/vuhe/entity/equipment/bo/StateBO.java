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
public class StateBO implements ElectricInfo {
    private static final int ROW_LEN = 2;
    private final List<StatusDTO> status;

    public StateBO(List<Byte> bytes) {
        if (bytes.size() % ROW_LEN != 0) {
            throw new IllegalArgumentException("读取byte时出错");
        }
        Iterator<Byte> it = bytes.iterator();
        List<StatusDTO> statusList = new LinkedList<>();
        // 存储实时值
        int length = bytes.size() / ROW_LEN;
        for (int i = 0; i < length; i++) {
            int channel = it.next();
            int value = it.next();
            statusList.add(new StatusDTO(channel, value));
        }
        status = Collections.unmodifiableList(statusList);
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
        return null;
    }
}
