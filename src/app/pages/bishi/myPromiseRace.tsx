'use client';

import { useEffect } from 'react';

export default () => {
  Promise.myRace = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        Promise.resolve(promise).then(resolve, reject);
      });
    });
  };

  useEffect(() => {
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(resolve, 500, 'one');
    });

    const promise2 = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, 'two');
    });

    Promise.myRace([promise1, promise2]).then((value) => {
      console.log(value, '自己的race'); // "two"，因为 promise2 先完成
    });
  }, []);
  return <div>之类是啥</div>;
};
