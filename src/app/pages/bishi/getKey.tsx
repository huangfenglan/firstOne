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
    // 示例用法
    const object = { a: [{ b: { c: 3 } }] };
    console.log(getVlaue(object, 'a[0].b.c'), '周'); // 输出: 3
    console.log(getVlaue(object, 'a.b.c', 'default'), '周jie'); // 输出: 'default'
    console.log(getVlaue(object, 'a'), 'jie11周'); // 输出: [{ b: { c: 3 } }]
  }, []);

  return <div>这里有啥自由</div>;
};
