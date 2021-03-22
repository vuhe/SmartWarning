package top.vuhe.drive;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * 信息帧
 * <p>
 * 从单片机设备获取的信息帧, 其中包含:
 * 命令数据: 包含 1byte, 是设备控制信息
 * dataInfo: 包含 [0, N]byte，是设备发送的数据
 *
 * @author zhuhe
 */
@Data
@AllArgsConstructor
class DataFrame {
    private int command;
    private List<Byte> dataInfo;
}
