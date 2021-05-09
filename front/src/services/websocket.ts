import Stomp from 'stompjs';

const socketURL = 'ws://101.132.158.106:15674/ws'; // rabbitmq
const login = 'vuhe'; // rabbitmq 账户
const passcode = 'ASDasd12'; // rabbitmq 密码

export function connect() {
  const ws = new WebSocket(socketURL);

  // 连接建立成功回调
  ws.addEventListener('open', () => {
    console.log(`Connection established. [readyState]: ${ws.readyState}`);
  });

  // 连接失败回调
  ws.addEventListener('error', () => {
    console.log(`Connection error. [readyState]: ${ws.readyState}`); // 3
  });

  // 连接关闭回调
  ws.addEventListener('close', (event) => {
    console.log(`Connection closed. [readyState]: ${ws.readyState}`); // 3
    console.log(event);
  });

  const stompClient = Stomp.over(ws);
  /**
   * heart-beating也就是频率，
   * incoming是接收频率，
   * outgoing是发送频率
   */
  stompClient.heartbeat.outgoing = 1000;
  stompClient.heartbeat.incoming = 0;

  // 连接消息服务器
  stompClient.connect(
    login,
    passcode,
    // Client.connect connectCallback 连接成功回调
    (_frame?: Stomp.Frame | undefined) => {
      // console.log(frame);
      // /exchange/exchange_name/routingKey
      stompClient.subscribe('/queue/realtime_queue', function (message: Stomp.Message) {
        // 收到消息
        console.log('[stompClient.subscribe]: 订阅成功...');
        console.log(JSON.parse(message.body));
      });
    },
    // Client.connect errorCallback? 连接成功回调
    (error: string | Stomp.Frame) => {
      console.log(error);
      // 可以在这里建立重连机制
    },
  );
}
