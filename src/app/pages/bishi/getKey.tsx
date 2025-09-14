import { useEffect } from 'react';
import _ from 'lodash';

export default () => {
  // const getVlaue = (obj, keystring) => {
  //   const finalstr = keystring
  //     .replaceAll('[', '.')
  //     .replaceAll(']', '.')
  //     .split('.')
  //     .filter((val) => !!val)
  //     .map((val) => (isNaN(Number(val)) ? val : Number(val)));
  //   console.log(
  //     finalstr,
  //     '这里可以通过吗数组',
  //     keystring.replaceAll('[', '.').replaceAll(']', '.')
  //   );
  //   let value = obj;
  //   for (var i = 0; i < finalstr.length; i++) {
  //     const key = finalstr[i];
  //     value = value[key];

  //     if (!value) {
  //       return '默认数据666';
  //     }
  //   }
  //   return value;
  // };

  function getVlaue(obj, path, defaultValue = undefined) {
    if (obj === null || obj === undefined) return defaultValue;

    const pathArray = Array.isArray(path)
      ? path
      : path
          .split('.')
          .flatMap((segment) => {
            // 处理带方括号的索引，如 'a[0].b'
            return segment
              .split(/\[([^[\]]*)\]/g)
              .filter((part) => part.length > 0);
          })
          .map((key) => key.replace(/["']/g, '')); // 移除引号
    console.log(pathArray, 'pathArray');
    let result = obj;
    for (const key of pathArray) {
      result = result[key];
      if (result === undefined) return defaultValue;
    }

    return result !== undefined ? result : defaultValue;
  }

  useEffect(() => {
    // // 示例用法
    // const object = { a: [{ b: { c: 3 } }] };
    // console.log(getVlaue(object, 'a[0].b.c[4]'), '周'); // 输出: 3
    // // console.log(getVlaue(object, 'a.b.c', 'default'), '周jie'); // 输出: 'default'
    // // console.log(getVlaue(object, 'a'), 'jie11周'); // 输出: [{ b: { c: 3 } }]

    const obj = {
      a: {
        'b.c': [{ d: 'hello' }],
      },
    };

    console.log(_.get(obj, 'a["b.c"][0].d'), '这里可以通过吗'); // 'hello'
  }, []);

  return <div>这里有啥自由</div>;
};
