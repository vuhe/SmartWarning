package top.vuhe.entity.equipment.bo;

import lombok.Data;

import java.util.Iterator;
import java.util.List;

/**
 * @author zhuhe
 */
@Data
public class DeviceBO {
    private static final int MIN_LEN = 29;
    private static final int IMEI_LEN = 15;
    private static final int ID_LEN = 12;
    private static final int TYPE_LEN = 2;
    private final String imei;
    private final String id;
    private final String type;

    /**
     * 此部分仅解码：
     * 1-15  模块的15位IMEI编号的ASCII码，
     * 16-27 模块的12位ID的ASCII码，
     * 28-29 模块类型的ASCII码
     *
     * @param bytes 帧读取的byte流
     */
    DeviceBO(List<Byte> bytes) {
        if (bytes.size() < MIN_LEN) {
            throw new IllegalArgumentException("读取byte时出错");
        }
        Iterator<Byte> it = bytes.iterator();
        imei = getStringFromByte(it, IMEI_LEN);
        id = getStringFromByte(it, ID_LEN);
        type = getStringFromByte(it, TYPE_LEN);
    }

    /**
     * byte to String(ASCII)
     *
     * @param it  迭代器
     * @param len 长度
     * @return 信息
     */
    private String getStringFromByte(Iterator<Byte> it, int len) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < len; i++) {
            byte b = it.next();
            sb.append((char) b);
        }
        return sb.toString();
    }
}
