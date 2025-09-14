'use client';

import exp from 'constants';
import { useRef, useState } from 'react';
import { useLocalCache } from './hooks';
import { Button, Space } from 'antd';
import { resolve } from 'path';

export default () => {
  const { value, updateValue } = useLocalCache('testKey', [], 1000 * 20);
  const [loading, setLoading] = useState(false);

  const getFetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['测试字段66']);
      }, 25 * 1000);
    });
  };

  const btnClick = async () => {
    if (value?.length === 0) {
      const result = await getFetchData();
      updateValue(result);
    }
  };

  return (
    <Space>
      <Button onClick={btnClick}>更改数据</Button>
      <Button
        onClick={() => {
          console.log('这里有啥11', value);
        }}
      >
        获取数据
      </Button>
    </Space>
  );
};
