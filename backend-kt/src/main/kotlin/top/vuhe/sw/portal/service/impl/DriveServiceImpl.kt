package top.vuhe.sw.portal.service.impl

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
import org.springframework.stereotype.Service
import top.vuhe.sw.common.util.LinkedList
import top.vuhe.sw.common.util.getAllRiskFactorValue
import top.vuhe.sw.entity.DriveDAO
import top.vuhe.sw.entity.DriveVO
import top.vuhe.sw.entity.RiskFactorNode
import top.vuhe.sw.entity.RiskFactorVO
import top.vuhe.sw.mapper.DriveMapper
import top.vuhe.sw.portal.service.DriveService

@Service("DriveService")
class DriveServiceImpl : ServiceImpl<DriveMapper, DriveDAO>(), DriveService {

    private val driveMap by lazy {
        list().associateBy { it.id }
    }

    override fun getDriveList(): List<DriveVO> {
        return list()
    }

    override fun getRiskFactor(): List<RiskFactorVO> {
        val listVO = ArrayList<RiskFactorVO>()
        // 风险系数遍历
        for (risk in getAllRiskFactorValue()) {
            // 处理一个风险系数
            val nodeList = LinkedList<RiskFactorNode>()
            for (n in risk.data) {
                driveMap[n.key]?.let {
                    nodeList.add(
                        RiskFactorNode(
                            driveName = it.driveName,
                            value = n.value
                        )
                    )
                }
            }
            listVO.add(
                RiskFactorVO(
                    time = risk.time,
                    list = nodeList
                )
            )
        }
        return listVO
    }

    override fun getDriveNameById(id: Int): String {
        return driveMap[id]?.driveName ?: ""
    }
}