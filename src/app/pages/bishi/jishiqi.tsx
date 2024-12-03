'use client';

import { Button } from 'antd';
import { useMemo, useRef, useState } from 'react';

export default () => {
  const timer = useRef('计时器');
  const [curTime, setCurTime] = useState(null);
  const [tamp, setTamp] = useState<any>(null);

  const startTimer = (isRepeat) => {
    const now = Date.now();
    setTamp(isRepeat ? curTime : now);
    timer.current = setInterval(() => {
      const data = Date.now();
      setCurTime(data);
    }, 10);
  };

  const finalData = useMemo(() => {
    let secondsPassed = 0;
    if (tamp != null && curTime != null) {
      secondsPassed = (curTime - tamp) / 1000;
    }
    return secondsPassed;
  }, [curTime, tamp]);
  console.log(curTime, 99999, tamp);
  return (
    <div>
      <Button onClick={() => startTimer(false)}>开始</Button>
      <Button onClick={() => clearInterval(timer.current)}>暂停</Button>
      <Button onClick={() => startTimer(true)}>重新开始</Button>
      {/* <Button>暂停</Button> */}
      <Button
        onClick={() => {
          clearInterval(timer.current);
          setCurTime(null);
          setTamp(null);
        }}
      >
        结束
      </Button>

      <div>过去的时间为：{finalData}</div>
    </div>
  );
};
