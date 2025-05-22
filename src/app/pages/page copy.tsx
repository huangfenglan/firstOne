'use client';

import { resolve } from 'path';
import promise from './bishi/promise';
import { useEffect } from 'react';

export default () => {
  const test = () => {
    console.log(2);
    let doit;
    const prom = new Promise((resolve) => {
      console.log(3);
      doit = resolve;
      console.log(6);
    });
    prom.then(() => console.log(4));
    async function s1() {
      console.log(7);
      await s2();
      console.log(1); //2 3 6 7 9 1 8 4 5 10
      doit();
      console.log(8);
    }
    async function s2() {
      console.log(9);
    }
    s1();
    console.log(5);
    prom.then(() => console.log(10));
  };

  return <div onClick={test}>测试11</div>;
};
