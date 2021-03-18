package top.vuhe.drive.plc;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * @author zhuhe
 */
@Data
@AllArgsConstructor
public class PlcInfoFrame {
    private int command;
    private List<Byte> dataInfo;
}
