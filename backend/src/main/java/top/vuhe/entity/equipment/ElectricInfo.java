package top.vuhe.entity.equipment;

import top.vuhe.entity.equipment.dto.RealTimeDTO;
import top.vuhe.entity.equipment.dto.StatusDTO;
import top.vuhe.entity.equipment.dto.ThresholdDTO;

import java.util.List;

/**
 * @author zhuhe
 */
public interface ElectricInfo {
    /**
     * 获取实时信息
     *
     * @return 实时值DTO
     */
    List<RealTimeDTO> getRealTimeDTO();

    /**
     * 获取状态信息
     *
     * @return 状态DTO
     */
    List<StatusDTO> getStatusDTO();

    /**
     * 获取阈值信息
     *
     * @return 阈值DTO
     */
    List<ThresholdDTO> getThresholdDTO();
}
