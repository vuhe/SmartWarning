package top.vuhe.drive;

public class NettyTest {
    public static void main(String[] args) {
        //启动netty客户端
        NettyClient nettyClient = new NettyClient();
        nettyClient.start();
    }
}
