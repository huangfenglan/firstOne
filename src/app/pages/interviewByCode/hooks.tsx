/**
 *
 * @param key 储存数据的key
 * @param defaultValue 初始值
 * @param ttl 过期的时间戳
 * 储存数据结构为： key:{data,expiresAt}
 *
 */

import { message } from 'antd';
import { useEffect, useState } from 'react';

export const useLocalCache = (
  key: string,
  defaultValue: any[],
  ttl: number
) => {
  const getDefaultValue = () => {
    try {
      const dataFromLocal = localStorage.getItem(key);

      if (!dataFromLocal) return defaultValue;
      const { data, expiresAt } = JSON.parse(dataFromLocal);
      if (Date.now() - expiresAt > 0) {
        // localStorage.removeItem(key);
        return defaultValue;
      }
      return data;
    } catch (error) {
      return defaultValue;
    }
  };
  const [value, setValue] = useState(getDefaultValue());
  const updateValue = (newValue: any) => {
    if (!!ttl) {
      setValue(newValue);
      try {
        // const expiresAt = ttl !== null ? Date.now() + ttl : null;
        const expiresAt = Date.now() + ttl;
        localStorage.setItem(
          key,
          JSON.stringify({ data: newValue, expiresAt })
        );
      } catch (error) {
        console.error('获取数据失败');
      }
    } else {
      message.info('时间设置不可以为空哦');
    }
  };

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) return;
    const { expiresAt } = JSON.stringify(item);
    let timer;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      timer = setTimeout(() => {
        localStorage.removeItem(key);
      }, timeout);
    }
  }, [ttl, key, defaultValue]);

  return { value, updateValue };
};
