import { Button } from 'antd';
import { log } from 'console';
import { useEffect } from 'react';

export default () => {
  const handlerInFlat = (arr: any[]) => {
    /**
     * 在 JavaScript 里，flat() 方法主要用于把嵌套数组 “扁平化”，也就是将多维数组转化为一维数组
     * const newArray = oldArray.flat([depth]);
     * depth是一个可选参数，规定了要扁平化的嵌套层级，默认为1
     * 会自动删除空项
     */
    return arr.flat(Infinity);
  };

  const handlerInReduce = (arr: any[]) => {
    return arr.reduce((acc, value) => {
      const finalData = Array.isArray(value) ? handlerInReduce(value) : value;
      console.log(Array.isArray(value), '这里是不是数组', finalData);
      return acc.concat(finalData);
      //   return acc.concat(Array.isArray(value) ? handlerInReduce(value) : value);
    }, []);
  };

  const handlerInArrJoin = (arr: any[]) => {
    return arr
      .join(',')
      .split(',')
      .map((val) => {
        const isNum = typeof Number(val) === 'number';
        return isNum ? Number(val) : val;
      });
  };

  

  const flatArr = (arr: any[]) => {
    const dataInJoin = handlerInArrJoin(arr);

    const dataInFlat = handlerInFlat(arr);

    const dataInReduce = handlerInReduce(arr);
    console.log(dataInReduce, 'reduce方法的扁平化');

    // console.log(dataInJoin, '数组join的方法', dataInFlat, '数组的flat方法');
  };

  const getData = () => {
    const arr = [1, [2, [3, [4, 5]]], 6];
    flatArr(arr);
  };
  useEffect(() => {}, []);
  return <Button onClick={getData}>数组的扁平化处理</Button>;
};
