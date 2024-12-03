// myWebSocket.js  单独把websocket的处理方法抽离出来
import eventBus from './eventBus.js';
// 定义websocket消息类型
const ModeCodeEnum = {
  MSG: 'message', // 普通消息
  HEART_BEAT: 'heart_beat', // 心跳
};
class MyWebSocket extends WebSocket {
  constructor(url) {
    super(url);
    return this;
  }
  /**
   * heartBeatConfig 心跳连接参数
   *    time: 心跳时间间隔
   *    timeout: 心跳超时间隔
   *    reconnect: 断线重连时间间隔
   * isReconnect 是否断线重连
   */
  init(heartBeatConfig, isReconnect) {
    this.onopen = this.openHandler; // 连接成功后的回调函数
    this.onclose = this.closeHandler; // 连接关闭后的回调 函数
    this.onmessage = this.messageHandler; // 收到服务器数据后的回调函数
    this.onerror = this.errorHandler; // 连接发生错误的回调方法
    this.heartBeatConfig = heartBeatConfig; // 心跳连接配置参数
    this.isReconnect = isReconnect; // 记录是否断线重连
    this.reconnectTimer = null; // 记录断线重连的时间器
    this.startHeartBeatTimer = null; // 记录心跳时间器
    this.webSocketState = false; // 记录socket连接状态 true为已连接
  }
  // 获取消息
  getMessage({ data }) {
    return JSON.parse(data);
  }
  // 发送消息
  sendMessage(data) {
    // 当前的this 就是指向websocket
    return this.send(JSON.stringify(data));
  }
  // 连接成功后的回调函数
  openHandler() {
    console.log('====onopen 连接成功====');
    // 触发事件更改按钮的状态
    eventBus.emit('changeBtnState', 'open');
    // socket状态设置为连接，做为后面的断线重连的拦截器
    this.webSocketState = true;
    // 判断是否启动心跳机制
    if (this.heartBeatConfig && this.heartBeatConfig.time) {
      this.startHeartBeat(this.heartBeatConfig.time);
    }
  }
  // 收到服务器数据后的回调函数
  messageHandler(data) {
    const { ModeCode, msg } = this.getMessage(data);
    switch (ModeCode) {
      case ModeCodeEnum.MSG: // 普通消息类型
        console.log('====onmessage 有新消息啦====', msg);
        break;
      case ModeCodeEnum.HEART_BEAT: // 心跳
        this.webSocketState = true;
        console.log('====onmessage 心跳响应====', msg);
        break;
    }
  }
  // 连接关闭后的回调 函数
  closeHandler() {
    console.log('====onclose websocket关闭连接====');
    // 触发事件更改按钮的状态
    eventBus.emit('changeBtnState', 'close');
    // 设置socket状态为断线
    this.webSocketState = false;
    // 在断开连接时 记得要清楚心跳时间器和 断开重连时间器材
    this.startHeartBeatTimer && clearTimeout(this.startHeartBeatTimer);
    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.reconnectWebSocket();
  }
  errorHandler() {
    console.log('====onerror websocket连接出错====');
    // 触发事件更改按钮的状态
    eventBus.emit('changeBtnState', 'close');
    // 设置socket状态为断线
    this.webSocketState = false;
    // 重新连接
    this.reconnectWebSocket();
  }

  // 心跳初始化方法 time：心跳间隔
  startHeartBeat(time) {
    this.startHeartBeatTimer = setTimeout(() => {
      // 客户端每隔一段时间向服务端发送一个心跳消息
      this.sendMessage({
        ModeCode: ModeCodeEnum.HEART_BEAT,
        msg: Date.now(),
      });
      this.waitingServer();
    }, time);
  }
  //在客户端发送消息之后，延时等待服务器响应,通过webSocketState判断是否连线成功
  waitingServer() {
    this.webSocketState = false;
    setTimeout(() => {
      // 连线成功状态下 继续心跳检测
      if (this.webSocketState) {
        this.startHeartBeat(this.heartBeatConfig.time);
        return;
      }
      console.log('心跳无响应, 已经和服务端断线');
      // 重新连接时，记得要先关闭当前连接
      try {
        this.close();
      } catch (error) {
        console.log('当前连接已经关闭');
      }
      // // 重新连接
      // this.reconnectWebSocket()
    }, this.heartBeatConfig.timeout);
  }

  // 重新连接
  reconnectWebSocket() {
    // 判断是否是重新连接状态(即被动状态断线)，如果是主动断线的不需要重新连接
    if (!this.isReconnect) {
      return;
    }
    // 根据传入的断线重连时间间隔 延时连接
    this.reconnectTimer = setTimeout(() => {
      // 触发重新连接事件
      eventBus.emit('reconnect');
    }, this.heartBeatConfig.reconnect);
  }
}
export default MyWebSocket;
