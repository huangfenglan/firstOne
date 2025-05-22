'use client';

import { useEffect, useReducer, useState } from 'react';
import { useForceUpdate } from './hooks';
import { Button } from 'antd';
// import './index.less';
let num = 0;
let timer: NodeJS.Timeout;
export default () => {
  const [data, setData] = useState(0);

  //   const forceUpdate = useForceUpdate();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const cut = () => {
    timer = setInterval(() => {
      forceUpdate();
    }, 1000);
    console.log(888, timer);
  };

  // useEffect(() => {
  //   cut();
  // }, []);
  num = num + 1;
  console.log(timer, 6666, num);

  return (
    <div>
      {num}
      <Button onClick={() => clearInterval(timer)}>暂停</Button>
      {/* <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          background: 'red',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          这里是需要测试的
        </div>
      </div> */}
      {/* <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          background: 'red',
        }}
      >
        <div
          style={{
            position: 'absolute',
            // left: '50%',
            // top: '50%',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            textAlign: 'center',
            margin: 'auto',
            width: '100px',
            height: '100px',
            background: 'gray',
            // transform: 'translate(-50%,-50%)',
          }}
        >
          这里是需要测试的
        </div>
      </div> */}
      {/* <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          background: 'red',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            right: '50%',
            bottom: '50%',
            // width: '100px',
            // height: '100px',
            margin: 'auto',
            // margin: '0 auto',
          }}
        >
          这里是需要测试的1212
        </div>
      </div> */}
    </div>
  );
};
