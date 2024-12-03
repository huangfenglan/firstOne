'use client';

import { useEffect } from 'react';

export default () => {
  const get = (obj, path, defaulValue = 'default') => {
    let isPathArrary = Array.isArray(path);
    let data: any = obj;
    let finalPath = path;
    if (!isPathArrary) {
      finalPath = path.replace('[', '.').replace(']', '').split('.');
    }
    console.log(finalPath, '000000');
    finalPath.forEach((element) => {
      const isString = isNaN(parseInt(element));
      const str = isString ? element : parseInt(element);
      data = data[str] || {};
    });
    return !!data ? data : defaulValue;
  };

  useEffect(() => {
    var object = { a: [{ b: { c: 3 } }] };
    console.log(
      get(object, 'a[0].b.c'),
      get(object, ['a', '0', 'b', 'c']),
      get(object, 'a.b.c', 'default'),
      "get(object, 'a.b.c', 'default')"
    );
  }, []);

  return <div>获取数据的方法</div>;
};
