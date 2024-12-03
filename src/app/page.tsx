'use client';

import { Button } from 'antd';
import { rejects } from 'assert';
import { resolve } from 'path';
import { useRef, useState } from 'react';

export default () => {
  const ref = useRef();
  const [data, setData] = useState<number>(0);
  const test = () => {
    const obj = { name: '张三', age: 90 };
    const arr = Object.entries(obj);
    console.log(
      new URLSearchParams(arr).toString(),
      'json的结果',
      new URLSearchParams(arr).toString()
    );
  };

  // const handlerTest = async () => {
  //   const data = await test();
  //   console.log(data, '最后的结果');
  // };
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
