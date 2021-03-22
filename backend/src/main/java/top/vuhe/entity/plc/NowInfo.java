package top.vuhe.entity.plc;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @author zhuhe
 */
@Data
public class NowInfo {
    private static final int HEAD_LEN = 2;
    private static final int ROW_LEN = 3;
    private final int status;
    private final Map<Integer, Integer> data = new HashMap<>();

    NowInfo(List<Byte> bytes) {
        if (bytes.size() < HEAD_LEN ||
                (bytes.size() - HEAD_LEN) % ROW_LEN != 0) {
            throw new IllegalArgumentException("读取byte时出错");
        }
        Iterator<Byte> it = bytes.iterator();
        // 设置设备总状态
        status = it.next();
        // 忽略信号强度
        it.next();
        // 存储实时值
        int length = (bytes.size() - HEAD_LEN) / ROW_LEN;
        for (int i = 0; i < length; i++) {
            int channel = it.next();
            int value = it.next();
            value = value << 8 + it.next();
            data.put(channel, value);
        }
    }
}
