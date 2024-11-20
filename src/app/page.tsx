'use client';

import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  let exam: any;
  let timer: any;
  const [isRequesting, setIsRequesting] = useState(false);

  const mockRequest = () => {
    setIsRequesting(true);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(true);
        clearTimeout(timer);
      }, 5000);
    });
  };
  const testFun = async () => {
    if (!timer) {
      const data = await mockRequest();
      setIsRequesting(false);
    }
  };
  return (
    <Button disabled={isRequesting} onClick={testFun}>
      测试
    </Button>
  );
};
