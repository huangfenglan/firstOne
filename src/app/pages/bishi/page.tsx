'use client';

import { useEffect } from 'react';
import Jielun from './Jieliu';
import PaiXu from './paiXu';
import TreeWithReduce from './arrToTree';
import Dumiao from './dumiao';

export default () => {
  // Please implement the function 'get' below to make the test cases pass.
  // This is a function to get the value at path of object.
  // If the resolved value is undefined, the defaultValue is returned in its place.

  // => 'default'
  const getPath = (path) => {
    const isPathArr = Array.isArray(path);
    let data = [];

    if (isPathArr) {
      const arr: string[] = [];
      path.forEach((key, index) => {
        const isNum = !isNaN(parseFloat(key));
        if (isNum) {
          arr[index - 1] = `${arr[index]}[${key}]`;
        } else {
          arr[index] = path[index];
        }
      });
      data = arr;
    } else {
      data = path.split('.');
    }
    return data;
  };
  function get(obj, path, defaultValue = 'default') {
    const finalPath = getPath(path);
    let result: any = obj;
    // console.log(obj['a']);
    const isPathArr = Array.isArray(path);
    if (!isPathArr) {
      path = path
        .split('.')
        .join('.')
        .split('[')
        .join('.')
        .split(']')
        .join('')
        .split('.');
    }
    console.log(result, '最后的结果', path);
    path.forEach((key) => {
      const fKey = !isNaN(parseInt(key)) ? parseInt(key) : key;
      console.log('最后的结果', result);
      result = !!result ? (result[fKey] ? result[fKey] : null) : null;
    });
    console.log(result?.length, 'result?.length');

    return !!result ? result : defaultValue;
  }

  useEffect(() => {
    var object = { a: [{ b: { c: 3 } }] };
    // get(object, 'a[0].b.c');
    // => 3
    // get(object, ['a', '0', 'b', 'c']);
    // // => 3
    // get(object, 'a.b.c', 'default');
    // console.log(
    //   get(object, 'a[0].b.c'),
    //   get(object, ['a', '0', 'b', 'c']),
    //   get(object, 'a.b.c', 'default'),
    //   "get(object, 'a.b.c', 'default')"
    // );
  }, []);

  return (
    <div>
      <Jielun />
      <PaiXu />
      <TreeWithReduce />
      <Dumiao />
    </div>
  );
};
