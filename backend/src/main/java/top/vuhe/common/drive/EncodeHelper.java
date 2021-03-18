package top.vuhe.common.drive;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * @author zhuhe
 */
@Slf4j
public class EncodeHelper {
    public static byte[] encodeMsg(PlcCodeEnum commandType, List<Byte> dataInfo) {
        log.info(String.valueOf(commandType.getCode()));
        return new byte[]{commandType.getCode(), 0x01};
    }
}
