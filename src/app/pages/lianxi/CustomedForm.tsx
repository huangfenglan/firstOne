'use client';

import { useRef, useEffect } from 'react';

// 创建支持 once 特性的事件发射器
const createEventEmitter = () => {
  const events = new Map();

  return {
    on: (eventName, callback) => {
      if (!events.has(eventName)) {
        events.set(eventName, new Set());
      }
      events.get(eventName).add(callback);
    },
    once: (eventName, callback) => {
      const onceCallback = (...args) => {
        callback(...args);
        this.off(eventName, onceCallback);
      };
      this.on(eventName, onceCallback);
    },
    off: (eventName, callback) => {
      if (events.has(eventName)) {
        events.get(eventName).delete(callback);
      }
    },
    emit: (eventName, ...args) => {
      if (events.has(eventName)) {
        events.get(eventName).forEach((callback) => callback(...args));
      }
    },
  };
};

// 使用 Hook 封装事件发射器
const useEventEmitter = () => {
  const emitterRef = useRef(createEventEmitter());
  return emitterRef.current;
};

// 组件使用示例
const MyComponent = () => {
  const emitter = useEventEmitter();

  useEffect(() => {
    // 只触发一次的事件
    emitter.once('data', (data) => {
      console.log('只执行一次:', data);
    });

    // 模拟异步数据获取
    setTimeout(() => {
      emitter.emit('data', { message: 'Hello' });
      emitter.emit('data', { message: 'World' }); // 第二次触发不会执行回调
    }, 1000);

    // 组件卸载时清理
    return () => {
      emitter.off('data');
    };
  }, []);

  return <div>监听一次性事件...</div>;
};

export default MyComponent;
