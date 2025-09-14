'use client';
import { log } from 'console';
import { useEffect } from 'react';

export default () => {
  var curring = function (fn) {
    var _args = Array.prototype.slice.call(arguments, 1); //生成变量，进行所有参数的储存

    var _func = function () {
      console.log(_args, 'arguments');
      if (arguments.length === 0) {
        return fn.apply(this, _args); //这里要是用call方法 需要对参数做成调整
      } else {
        //否则，存储参数到闭包中，返回本函数
        _args = _args.concat([...arguments]);
        return _func;
      }
    };
    return _func;
  };

  function addPara() {
    // 业务函数
    const data = [...arguments];
    return data.reduce((a, b) => a + b, 0);
  }

  const add = (...args) => {
    const f = add.bind(null, ...args);
    console.log(args, '这里是bind', f);

    f.sum = () => {
      return args.reduce((sum, value) => (sum += value), 0);
    };
    return f;
  };

  function sum(a) {
    let currentSum = a;

    function add(b) {
      currentSum += b;
      return add;
    }

    add.toString = function () {
      return currentSum;
    };

    return add;
  }

  useEffect(() => {
    // const addData = curring(addPara);
    // const data = addData(1, 2, 3)(1)();
    // const data1 = addData(2, 3)();
    // const data3 = addData(9, 12, 90)(9)();
    // console.log(data, 'data1');
    // console.log(add(1)(2, 3)(4, 5, 6).sum());

    console.log(sum(1)(2)(3).toString(), '这里的结果事实');
  }, []);
  return <div>这里是有啥</div>;
};
