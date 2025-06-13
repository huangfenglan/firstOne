'use client';
import { Button, Space } from 'antd';
import { log } from 'node:console';

const testObj = { name: 'zhoujielun' };

export default () => {
  /**
   * fn:防抖的回调函数
   * delay:防抖间隔的时间  单位为ms
   */

  const debounce = (fn: () => void, delay: number) => {
    let timer: any = null;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        return fn.apply(context, args);
      }, delay);
    };
  };

  /**
   * 节流
   */
  const throttle = function (fn, delay) {
    let isInThrottle = false;
    return function (...args) {
      if (!isInThrottle) {
        fn.apply(this, args);
        isInThrottle = true;
        setTimeout(() => (isInThrottle = false), delay);
      }
    };
  };

  //手写call
  Function.prototype.myCall = function (obj: any, ...rest) {
    const context = obj || window;
    const fn = Symbol();
    context[fn] = this; //this指的是当前调用的函数
    console.log(context, '----之前', rest);
    const result = context[fn](...rest);
    delete context[fn];
    return result;
  };

  //手写bind
  Function.prototype.myBind = function (obj: any, rest) {
    const context = obj || window;
    const fn = this;
    return function (...args) {
      console.log(rest, 'rest', args);
      return fn.myCall(context, ...[...rest, ...args]);
    };
  };

  function testMyCall() {
    console.log(this);

    console.log(arguments, 'myCall');
  }

  return (
    <Space>
      {/* <Button
        onClick={debounce(function () {
          console.log('发送网络请求');
        }, 500)}
      >
        防抖
      </Button> */}
      <Button
        onClick={() =>
          debounce(function () {
            console.log('发送网络请求');
          }, 500)()
        }
      >
        防抖11
      </Button>
      <Button onClick={() => testMyCall.myCall(testObj, 'singer')}>call</Button>
      <Button
        onClick={() => testMyCall.myBind(testObj, ['singer'])('female', 'zhou')}
      >
        myBind
      </Button>
    </Space>
  );
};
