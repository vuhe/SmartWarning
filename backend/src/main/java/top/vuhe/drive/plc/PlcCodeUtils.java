package top.vuhe.drive.plc;

import java.util.HashMap;
import java.util.Map;

import static top.vuhe.drive.plc.PlcCodeEnum.*;

/**
 * @author zhuhe
 */
public final class PlcCodeUtils {
    /**
     * 响应请求
     */
    private static final Map<Byte, PlcCodeEnum> RESPONSE_MAP = new HashMap<>() {{
        put((byte) 0x10, LOGIN_RE);
        put((byte) 0x20, HEARTBEAT_RE);
        put((byte) 0x30, NOW_VALUE_RE);
        put((byte) 0x32, THRESHOLD_RE);
        put((byte) 0x34, STATUS_RE);
        put((byte) 0x36, SYS_INFO_RE);
    }};

    private PlcCodeUtils() {
    }

    public static PlcCodeEnum getResponseCode(byte b) {
        return RESPONSE_MAP.getOrDefault(b, null);
    }
}
