'use client';
import { Button } from 'antd';
import { resolve } from 'path';
import { useEffect, useMemo, useState } from 'react';

export default () => {
  let data = 0;
  const [count, setCount] = useState(0);

  const countSecond = async () => {
    const dom = document.getElementById('container');
    while (data < 10) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      data = data + 1;
      dom.innerText = data;
    }
  };

  return (
    <div>
      <Button onClick={countSecond}>开始读秒</Button>
      <div id="container">现实内容: {count < 10 ? `${count}s` : '已读完'}</div>
    </div>
  );
};
