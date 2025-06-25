// WebSocket 心跳检测示例（客户端）
class WebSocketHeartbeat {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.heartbeatInterval = null; // 心跳间隔
    this.pingTimeout = null; // 响应超时
    this.heartbeatTimeout = 30000; // 30秒未响应视为断开
    this.heartbeatIntervalTime = 25000; // 25秒发送一次心跳
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log('WebSocket 连接已建立');
      this.startHeartbeat();
    };

    this.ws.onmessage = (event) => {
      // 处理正常消息
      if (event.data === 'pong') {
        // 收到心跳响应，重置超时计时器
        clearTimeout(this.pingTimeout);
      } else {
        // 处理业务消息...
      }
    };

    this.ws.onclose = (event) => {
      console.log(`WebSocket 连接关闭，状态码: ${event.code}`);
      clearInterval(this.heartbeatInterval);
      clearTimeout(this.pingTimeout);
      // 尝试重连
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket 错误:', error);
      clearInterval(this.heartbeatInterval);
      clearTimeout(this.pingTimeout);
      this.reconnect();
    };
  }

  startHeartbeat() {
    // 定时发送心跳包
    this.heartbeatInterval = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        try {
          this.ws.send('ping');
          // 设置响应超时
          this.pingTimeout = setTimeout(() => {
            console.log('心跳响应超时，断开连接');
            this.ws.close();
          }, this.heartbeatTimeout);
        } catch (error) {
          console.error('发送心跳包失败:', error);
          this.ws.close();
        }
      }
    }, this.heartbeatIntervalTime);
  }

  reconnect() {
    // 重连策略（指数退避）
    clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = setTimeout(() => {
      console.log('尝试重连 WebSocket...');
      this.connect();
    }, this.getReconnectInterval());
  }

  getReconnectInterval() {
    // 指数退避算法：初始1秒，最大30秒
    if (!this.reconnectAttempt) this.reconnectAttempt = 0;
    const baseInterval = 1000;
    const maxInterval = 30000;
    const interval = Math.min(
      baseInterval * 2 ** this.reconnectAttempt,
      maxInterval
    );
    this.reconnectAttempt++;
    return interval;
  }
}
