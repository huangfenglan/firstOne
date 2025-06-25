import { useEffect } from 'react';

export default () => {
  function objectFlat(obj = '') {
    const res = {};
    function flat(item, preKey = '') {
      Object.entries(item).forEach(([key, value]) => {
        let newKey = key;
        // console.log(value,typeof value,Array.isArray(value))
        if (Array.isArray(item)) {
          // console.log('是数组')
          newKey = preKey ? `${preKey}[${key}]` : key;
        } else {
          newKey = preKey ? `${preKey}.${key}` : key;
        }

        if (value && typeof value === 'object') {
          flat(value, newKey);
        } else {
          res[newKey] = value;
        }
      });
    }
    flat(obj);
    return res;
  }

  useEffect(() => {
    const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };

    const obj = {
      a: 1,
      b: [1, 2, { c: true }],
      c: { e: 2, f: 3 },
      g: null,
    };
    console.log(objectFlat(source), '扁平化对象');
    console.log(objectFlat(obj), '扁平化对象');
  }, []);

  return <div>这里是测试扁平化对象</div>;
};
