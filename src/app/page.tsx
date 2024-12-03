'use client';

import { useRef, useState } from 'react';

export default () => {
  const ref = useRef();
  const [data, setData] = useState<number>(0);
  const test = () => {
    const obj = { name: '张三', age: 90 };
    const arr = Object.entries(obj);
  };
  return (
    <div
      onClick={() => {
        // handlerTest();
        test();
        // console.log(test(arrIn), '最后的结果');
      }}
    >
      这里有什么
    </div>
  );
};
