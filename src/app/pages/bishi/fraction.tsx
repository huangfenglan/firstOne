'use client';
import { useEffect } from 'react';

export default () => {
  const handleNum = (num) => {
    const str = num.toString();
    const [intNum, fraction] = str.split('.');
    const intArr = intNum.split('');

    let result = '';
    let count = 0;
    for (let i = intArr.length - 1; i >= 0; i--) {
      result = `${intArr[i]}${result}`;
      count += 1;
      if (count % 3 === 0 && i !== 0) {
        result = `,${result}`;
      }
    }
    return !fraction ? result : `${result}.${fraction}`;
  };

  useEffect(() => {
    const result = handleNum(1234567.06);
    console.log(result, '千分符');
  }, []);
  return <div>千分符的数据</div>;
};
