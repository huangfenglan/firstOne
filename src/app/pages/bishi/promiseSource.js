import { Button } from 'antd';

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
export default () => {
  class MyPromise {
    #state = PENDING;
    #result = undefined;
    #handler = [];
    constructor(executor) {
      const resolve = (data) => {
        console.log(8899991);
        this.#changeState(FULFILLED, data);
      };
      const reject = (reason) => {
        this.#changeState(REJECTED, reason);
      };

      //捕捉executor函数中的同步错误 不能捕获异步报错
      try {
        executor(resolve, reject); //如果回调函数报错
      } catch (error) {
        reject(error);
      }
    }

    #changeState(state, result) {
      if (this.#state !== PENDING) return;
      this.#state = state;
      this.#result = result;
      this.#run();
    }

    #run() {
      console.log('这里走了吗');

      if (this.#state === PENDING) return;

      while (this.#handler?.length) {
        const { onFulfilled, onRejected, resolve, reject } =
          this.#handler.shift();
        if (this.#state === FULFILLED) {
          if (typeof onFulfilled === 'function') {
            try {
              const data = onFulfilled(this.#result);
              resolve(data);
            } catch (error) {
              reject(error);
            }
          } else {
            //这个地方处理的事数据穿透
            resolve(this.#result);
          }
        }

        if (this.#state === REJECTED) {
          if (typeof onRejected === 'function') {
            try {
              onRejected(this.#result);
            } catch (error) {
              reject(error);
            }
          } else {
            reject(this.#result);
          }
        }
      }
    }

    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        this.#handler.push({
          onFulfilled,
          onRejected,
          resolve,
          reject,
        });
        this.#run();
      });
    }
  }

  return (
    <div>
      <Button
        onClick={() => {
          const p = new MyPromise((resolve, reject) => {
            // console.log('之类有啥');
            // throw 6666;
            // resolve(999);
            // reject('测试错误');
            //这种报错事捕获不到的
            setTimeout(() => {
              reject(999000);
            }, 1000);
          });

          p.then(
            (res) => {
              console.log(res, '这里最终的结果1');
            },
            (err) => {
              console.log(err, '这里是所有的报错');
            }
          );

          p.then((res) => {
            console.log(res, '这里是结果22');
          });
        }}
      >
        测试实例{' '}
      </Button>
      <span>手撕自定义promise源码</span>
    </div>
  );
};
