'use client';
// iframe ref
import { useEffect, useReducer } from 'react';
import { Button } from 'antd';

let defaultSec = 10;
let timer: any = null;
let limit = defaultSec;

export default () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      forceUpdate();
      limit = limit - 1;
    }, 1000);
    console.log(timer, 'timer11');
  };

  const clearTimer = () => {
    // clearInterval(timer);
    // timer = null;
    console.log(timer, '计时器');

    // clearInterval(timer);
    // clearInterval(timer);
  };

  const closeTimer = () => {
    console.log(timer, 'timer');
    clearInterval(timer);
  };

  useEffect(() => {
    console.log(limit, '当前的读秒数');
  }, [limit]);
  return (
    <div>
      <Button onClick={start}>开始</Button>
      <Button onClick={() => clearInterval(timer)}>暂停</Button>
      <Button onClick={closeTimer}>关闭</Button>
      <span>{limit}</span>
    </div>
  );
};
