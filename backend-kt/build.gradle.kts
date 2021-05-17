import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.jetbrains.dokka") version "1.4.30"
    id("org.springframework.boot") version "2.4.4"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    kotlin("jvm") version "1.4.31"
    kotlin("plugin.spring") version "1.4.31"
}

group = "top.vuhe"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
    // maven 本地缓存仓库
    // 默认优先从此仓库查找
    mavenLocal()
    // 此部分为华为的 maven 镜像，用于提升国内访问速度
    maven(url = "https://repo.huaweicloud.com/repository/maven/")
    // maven 中央库
    mavenCentral()
    jcenter()
}

dependencies {
    // springboot 启动框架
    implementation("org.springframework.boot:spring-boot-starter-web")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")

    // json 默认解析包
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    // kotlin 默认配置
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core")

    // 数据库配置
    implementation("com.baomidou:mybatis-plus-boot-starter:3.4.2")
    implementation("com.alibaba:druid-spring-boot-starter:1.2.5")
    implementation("mysql:mysql-connector-java:8.0.23")
    implementation("org.springframework:spring-jdbc:5.3.5")

    // 单片机连接
    implementation("io.netty:netty-all:4.1.60.Final")

    // redis 缓存
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.apache.commons:commons-pool2:2.9.0")

    // rabbitMQ 中间件
    implementation("org.springframework.boot:spring-boot-starter-amqp")

    // 权限管理
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("io.jsonwebtoken:jjwt-api:0.11.2")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.2")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.2")

    // springboot 默认测试框架
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")

    // 文档
    dokkaHtmlPlugin("org.jetbrains.dokka:kotlin-as-java-plugin:1.4.30")
    implementation("io.springfox:springfox-boot-starter:3.0.0")
}

val fatJar = task("fatJar", type = Jar::class) {
    manifest {
        attributes["Main-Class"] = "top.vuhe.sw.SmartWarningApplicationKt"
    }
    from(configurations.runtimeClasspath.get().map { if (it.isDirectory) it else zipTree(it) })
    with(tasks.jar.get() as CopySpec)
}

tasks {
    "build" {
        dependsOn(fatJar)
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
