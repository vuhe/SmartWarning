package top.vuhe.sw.entity.equipment.bo

class DeviceBO(bytes: List<Byte>) {
    companion object {
        private const val MIN_LEN = 29
        private const val IMEI_LEN = 15
        private const val ID_LEN = 12
        private const val TYPE_LEN = 2
    }

    private val imei: String
    private val id: String
    private val type: String

    init {
        require(bytes.size >= MIN_LEN) { "读取byte时出错" }
        val it = bytes.iterator()
        imei = getStringFromByte(it, IMEI_LEN)
        id = getStringFromByte(it, ID_LEN)
        type = getStringFromByte(it, TYPE_LEN)
    }

    /**
     * byte to String(ASCII)
     *
     * @param it  迭代器
     * @param len 长度
     * @return 信息
     */
    private fun getStringFromByte(it: Iterator<Byte>, len: Int): String {
        val sb = StringBuilder()
        for (i in 0 until len) {
            val b = it.next()
            sb.append(b.toChar())
        }
        return sb.toString()
    }
}