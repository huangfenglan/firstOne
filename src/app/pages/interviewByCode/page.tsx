'use client';
import { useEffect } from 'react';

export default () => {
  const getVlaue = (obj, keystring) => {
    const finalstr = keystring
      .replace('[', '.')
      .replace(']', '.')
      .split('.')
      .filter((val) => !!val)
      .map((val) => (isNaN(Number(val)) ? val : Number(val)));

    let value = obj;
    for (var i = 0; i < finalstr.length; i++) {
      const key = finalstr[i];
      value = value[key];

      if (!value) {
        return '默认数据666';
      }
    }
    return value;
  };

  useEffect(() => {
    var object = { ae: [{ b: { c: 3 } }] };
    const data = getVlaue(object, 'ae[0].b.ct');
    console.log(data, '999');
  }, []);

  return <div>测试</div>;
};
