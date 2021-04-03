package top.vuhe.entity.plc;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author zhuhe
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class StateInfo extends PlcInfo {
    private static final int ROW_LEN = 2;
    private final Map<Integer, Integer> data = new HashMap<>();

    StateInfo(List<Byte> bytes) {
        if (bytes.size() % ROW_LEN != 0) {
            throw new IllegalArgumentException("读取byte时出错");
        }
        Iterator<Byte> it = bytes.iterator();
        // 存储实时值
        int length = bytes.size() / ROW_LEN;
        for (int i = 0; i < length; i++) {
            int channel = it.next();
            int value = it.next();
            data.put(channel, value);
        }
    }
}
