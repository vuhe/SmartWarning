package top.vuhe.sw.portal.service.impl

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import top.vuhe.sw.common.util.DateFormat
import top.vuhe.sw.entity.DriveLogDAO
import top.vuhe.sw.entity.DriveLogVO
import top.vuhe.sw.mapper.DriveLogMapper
import top.vuhe.sw.portal.service.DriveLogService
import top.vuhe.sw.portal.service.DriveService

@Service("DriveLogService")
class DriveLogServiceImpl(
    @Autowired val driveService: DriveService
) :
    ServiceImpl<DriveLogMapper, DriveLogDAO>(), DriveLogService {

    override fun searchAllLog(): List<DriveLogVO> {
        return list().map { i ->
            DriveLogVO(
                id = i.id,
                time = i.time,
                driveName = driveService.getDriveNameById(i.driveId),
                status = i.status,
                isProcessed = i.isProcessed,
                detail = i.detail
            )
        }
    }

    override fun searchAllInfo(): List<String> {
        return list().map { i ->
            val time = DateFormat.getDateTimeInstance().format(i.time)
            val process = if (i.isProcessed) "已" else "未"
            "$time: ${driveService.getDriveNameById(i.driveId)}出现异常，${process}处理"
        }
    }

    override fun handleError(id: Int) {
        getById(id)?.let {
            updateById(it.copy(isProcessed = true))
        }
    }
}