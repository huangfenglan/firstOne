'use client';

import { useEffect } from 'react';

export default () => {
  const renderLight = (text: string) => {
    console.log(text);
  };

  const timer = (secs: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(secs, 'secs');
        resolve();
      }, secs);
    });
  };

  const light = async () => {
    while (true) {
      await renderLight('红色');
      await timer(3000);
      await renderLight('绿色');
      await timer(5000);
      await renderLight('黄色');
      await timer(4000);
    }
  };

  return <div onClick={() => light()}>红绿灯</div>;
};
