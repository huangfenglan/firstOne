import { useState, useEffect } from 'react';

/**
 * 带有效期的本地缓存 Hook
 * @param {string} key - 缓存键名
 * @param {*} initialValue - 初始值
 * @param {number} [ttl=null] - 有效期（毫秒），null 表示永久有效
 * @returns {[*, Function]} - [当前值, 更新函数]
 */
export const useLocalCache = (key, initialValue, ttl = null) => {
  // 完整键名（添加版本标识，避免旧数据干扰）
  const fullKey = `cache-v1:${key}`;

  // 获取带有效期的缓存值
  const getInitialValue = () => {
    try {
      const item = localStorage.getItem(fullKey);
      if (!item) return initialValue;

      const { value, expiresAt } = JSON.parse(item);

      // 检查是否过期
      if (expiresAt !== null && Date.now() > expiresAt) {
        localStorage.removeItem(fullKey);
        return initialValue;
      }

      return value;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getInitialValue());

  // 更新缓存值（支持 TTL）
  const updateValue = (newValue) => {
    const finalValue =
      typeof newValue === 'function' ? newValue(value) : newValue;
    setValue(finalValue);

    try {
      const expiresAt = ttl !== null ? Date.now() + ttl : null;
      localStorage.setItem(
        fullKey,
        JSON.stringify({ value: finalValue, expiresAt })
      );
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  };

  // 监听过期时间（仅当 TTL 存在时）
  useEffect(() => {
    if (ttl === null) return;

    const item = localStorage.getItem(fullKey);
    if (!item) return;

    const { expiresAt } = JSON.parse(item);
    if (expiresAt === null) return;

    const timeout = expiresAt - Date.now();
    if (timeout <= 0) {
      setValue(initialValue);
      localStorage.removeItem(fullKey);
      return;
    }

    // 设置定时器自动过期
    const timer = setTimeout(() => {
      setValue(initialValue);
      localStorage.removeItem(fullKey);
    }, timeout);

    return () => clearTimeout(timer);
  }, [fullKey, ttl, initialValue]);

  return [value, updateValue];
};
