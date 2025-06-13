'use client';
import { useEffect } from 'react';

export default () => {
  // let str = 'abc#name&defg';

  const getReverseStr = (str) => {
    let data;
    // 方法一：利用数组的reverse方法
    // data = str.split('').reverse().join('');

    //方法二：利用循环
    for (var i = str.length - 1; i >= 0; i--) {
      data += str[i];
    }
    return data;
  };
  //截取某段子字符串
  const getSliceStr = (str: string) => {
    const finStr = 'name';
    const nameIndex = str.indexOf(finStr);
    const lastIndex = nameIndex + finStr.length;
    const finalStr = str.slice(nameIndex, lastIndex);
    return finalStr;
  };

  //获取指定子字符串出现的次数
  const getNameCount = (str: string) => {
    const childStr = 'name';
    const handleredStr = str.toLowerCase();
    let finalData;
    // // 主要利用split方法 把字符串转化为数组
    // finalData = handleredStr.split(childStr.toLocaleLowerCase()).length - 1;

    // 利用循环
    // const len = str.length - childStr.length;
    // finalData = 0;
    // for (var i = 0; i <= len; i++) {
    //   const data = handleredStr.slice(i, i + childStr.length);
    //   if (data === childStr.toLocaleLowerCase()) {
    //     finalData += 1;
    //   }
    // }

    //利用indexOf方法
    let pos = handleredStr.indexOf(childStr.toLocaleLowerCase());
    finalData = 0;
    while (pos !== -1) {
      finalData++;
      pos = handleredStr.indexOf(childStr.toLocaleLowerCase(), pos + 1);
    }
    return finalData;
  };
  // const nameIndex = str.indexOf('name');
  // const finalStr = str.slice(nameIndex, nameIndex + 4);
  // console.log(nameIndex, 'nameIndex索引', finalStr, str);
  useEffect(() => {
    let str = 'abc#name&namedefg**Name';
    const reverseData = getReverseStr(str);
    //获取指定子字符串出现的次数
    const nameCount = getNameCount(str);

    //获取截取指定子字符串
    const sliceStr = getSliceStr(str);

    console.log('获取reverse字符串', nameCount);
  }, []);

  return <div>这里是字符串的学习区域</div>;
};
