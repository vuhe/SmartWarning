package top.vuhe.common.drive;

import java.util.List;

/**
 * @author zhuhe
 */
public class DecodeHelper {
    public static String decodeMsg(int commandType, List<Byte> dataInfo) {
        StringBuilder sb = new StringBuilder();
        for (Byte b : dataInfo) {
            if (b < 16) {
                sb.append('0');
            }
            sb.append(Integer.toHexString(b & 0xFF));
        }
        return sb.toString();
    }
}
