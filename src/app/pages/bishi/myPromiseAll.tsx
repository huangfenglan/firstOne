import { useEffect } from 'react';

export default () => {
  Promise.myAll = function (promises) {
    let resolvedCount = 0;
    const result = [];
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (value) => {
            resolvedCount++;
            result[index] = value;
            if (resolvedCount === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };

  useEffect(() => {
    const promise1 = Promise.resolve(3);
    const promise2 = 42;
    const promise3 = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, 'foo');
    });

    Promise.myAll([promise1, promise2, promise3]).then((values) => {
      console.log(values); // [3, 42, "foo"]
    });
  }, []);
  return <div>这里需要沙门</div>;
};
