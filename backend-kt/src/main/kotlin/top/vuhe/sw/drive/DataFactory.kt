package top.vuhe.sw.drive

import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import top.vuhe.sw.common.util.Date
import top.vuhe.sw.common.util.handleRealtime
import top.vuhe.sw.common.util.handleRiskFactor
import top.vuhe.sw.entity.RealtimeValue
import top.vuhe.sw.entity.RiskFactorValue
import java.time.Duration

val timeInterval = Duration.ofMinutes(10).toMillis()
val leakage = 0..250
val temperature = 25..35
val current = 100..150
val voltage = 210..220
const val frequency = 50
val riskFactor = 10..30

suspend fun buildAll() = coroutineScope {
    launch { buildRiskFactor() }
    for (i in 1..5) {
        launch { buildRealTimeData(i) }
    }
}

suspend fun buildRealTimeData(driveId: Int) {
    while (true) {
        val realTimeData = HashMap<Int, Double>()
        realTimeData[1] = leakage.random().toDouble()
        for (i in 2..5) {
            realTimeData[i] = temperature.random().toDouble()
        }
        for (i in 6..8) {
            realTimeData[i] = current.random().toDouble()
        }
        for (i in 9..11) {
            realTimeData[i] = voltage.random().toDouble()
        }
        for (i in 12..14) {
            realTimeData[i] = frequency.toDouble()
        }
        handleRealtime(driveId, RealtimeValue(Date(), realTimeData))
        delay(timeInterval)
    }
}

suspend fun buildRiskFactor() {
    while (true) {
        val riskFactorData = HashMap<Int, Double>()
        var sum = 0.0
        for (i in 1..5) {
            val n = riskFactor.random().toDouble()
            sum += n
            riskFactorData[i] = n
        }
        riskFactorData[0] = sum / 5
        handleRiskFactor(RiskFactorValue(Date(), riskFactorData))
        delay(timeInterval)
    }
}

