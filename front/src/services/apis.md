url = https://zw.zhuhe.site/api

登录 :)
[POST]: /login
json 格式数据 { "username": "admin", "password": "admin" }

用户接口 :)
[POST]: /user/add
[PUT]: /user/modify
[DELETE]: /user/delete
[GET]: /user/getList

用户登录日志 :)
[GET]: /log/userLog

设备
[GET]: /realtime/getAll?driveId=1
[GET 获取设备列表（id, driveName）](/drive/getInfo) :)
[GET 获取设备风险信息数组](/drive/getRiskInfo) :)
[GET]: /log/driveLog
[GET]: /log/driveInfo
[PUT]: /log/handleDriveLog?id=1
