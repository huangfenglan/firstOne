'use client';
import { useEffect } from 'react';

export default () => {
  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('chengguo');
      }, 2000);
    });
  };
  // 原始的方法
  const handlerTimer = (fn, ms) => {
    let isResolved = false;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        isResolved = true;
        console.log('折柳走了吗2');
      }, 5000);
      fn().then((res: string) => {
        isResolved ? resolve('未超时') : reject('已经超时');
        console.log(res, '折柳走了吗1');
      });
    });
  };

  useEffect(() => {
    handlerTimer(fetchData, 3000)
      .then((e) => {
        console.log(e, '失败');
      })
      .catch((e) => {
        console.log(e, '成功');
      });
  }, []);
  return <div>这里是有啥999</div>;
};
