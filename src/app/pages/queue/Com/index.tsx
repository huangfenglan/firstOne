'use client';

import { useEffect } from 'react';

export default () => {
  // 解决循环引用，加个new WeakMap的Cache
  // WeakMap 的键是弱引用，告诉 JS 垃圾回收机制，当键回收时，对应 WeakMap 也可以回收，更适合大量数据深拷
  const deepClone = (obj, weakMap = new WeakMap()) => {
    if (typeof obj === 'object') {
      //A-----
      if (weakMap.has(obj)) return weakMap.get(obj);
      const newObj = Array.isArray(obj) ? [] : {};
      // B----
      weakMap.set(obj, newObj);

      for (const prop in obj) {
        newObj[prop] = deepClone(obj[prop], weakMap);
      }
      return newObj;
    } else {
      return obj;
    }
  };
  const test = () => {
    var obj1 = {
      //原数据，包含字符串、对象、函数、数组等不同的类型
      name: 'test',
      main: {
        a: 1,
        b: 2,
      },
    };
    obj1.obj1 = obj1; //nested循环引用
    const obj2 = deepClone(obj1);
    obj2.main.a = 99999;
    console.log('obj1', obj1);
    console.log('obj2', obj2);
  };

  useEffect(() => {
    test();
  }, []);

  return <div>这里是自引用的深拷贝</div>;
};
