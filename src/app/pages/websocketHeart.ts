// 创建WebSocket实例
const socket = new WebSocket('ws://your-websocket-server');

// 心跳间隔（秒）
const HEARTBEAT_INTERVAL = 30;
// 最大容忍未响应时间（秒）
const MAX_UNRESPONSE_TIME = 60;

let heartbeatIntervalId;
let maxUnresponseTimeId;

socket.onopen = function open() {
  // 当WebSocket连接打开时，开始心跳检测
  heartbeat();
};

function heartbeat() {
  // 发送心跳消息
  socket.send('HEARTBEAT');
  // 重置心跳和未响应时间计时器
  resetTimer();
}

function resetTimer() {
  // 清除之前的心跳和未响应时间计时器
  clearInterval(heartbeatIntervalId);
  clearTimeout(maxUnresponseTimeId);

  // 设置新的心跳计时器
  heartbeatIntervalId = setInterval(() => {
    heartbeat();
  }, HEARTBEAT_INTERVAL * 1000);

  // 设置未响应时间计时器
  maxUnresponseTimeId = setTimeout(() => {
    // 如果在规定时间内没有收到心跳响应，则认为连接已断开
    socket.close(); // 或执行重连逻辑
  }, MAX_UNRESPONSE_TIME * 1000);
}

// 收到服务器消息时重置计时器
socket.onmessage = function message() {
  resetTimer();
};

// 当WebSocket遇到错误时执行
socket.onerror = function error() {
  // 清除计时器并关闭连接
  clearInterval(heartbeatIntervalId);
  clearTimeout(maxUnresponseTimeId);
  socket.close();
};
