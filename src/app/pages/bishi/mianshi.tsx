'use client';

import { Space, Button } from 'antd';
import { time } from 'console';
import { useEffect, useReducer, useState } from 'react';

let timer: any = -1;
const defaultSec = 0;
// let sec = 0;

const ComputedTimer = ({ value }: any) => {
  let sec = value;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [count, setCount] = useState(value);
  const start = () => {
    close();
    timer = setInterval(() => {
      forceUpdate();
      // setSecs(secs + 1);
      sec = sec - 1;
      console.log('这里会不会变化11', sec);
      // value = value - 1;
      // const data = count - 1;
      // setCount(data);
    }, 1000);
  };

  useEffect(() => {
    console.log('这里会不会变化22');
  }, [sec]);

  const close = () => {
    clearInterval(timer);
  };
  return (
    <div>
      <Space>
        <Button onClick={start}>开始11</Button>
        <Button onClick={close}>暂停</Button>
        <Button
          onClick={() => {
            close();
            sec = defaultSec;
          }}
        >
          关闭
        </Button>
        <div> 倒计时：{sec}</div>
        {/* <div> hooks倒计时：{secs}</div> */}
      </Space>
    </div>
  );
};

export default () => <ComputedTimer value={60} />;
