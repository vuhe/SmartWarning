package top.vuhe.sw.entity.equipment.bo

class SystemBO(bytes: List<Byte>) {
    companion object {
        private const val ROW_LEN = 3
    }

    private val data: MutableMap<Int, Int> = HashMap()

    init {
        require(bytes.size % ROW_LEN == 0) { "读取byte时出错" }
        val it = bytes.iterator()
        // 存储实时值
        val length = bytes.size / ROW_LEN
        for (i in 0 until length) {
            val channel = it.next().toInt()
            var value = it.next().toInt()
            value = value shl 8 + it.next()
            data[channel] = value
        }
    }
}