import { useEffect } from 'react';

export default () => {
  function get(obj, path, defaultValue = undefined) {
    // 将路径字符串转换为数组（处理点号和方括号表示法）
    // const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    //isNaN(value)用法为：先把value转化为数字，然后在判断结果是不是为NaN,如果为NaN则为ture、反正为false
    // trim()的用法为：用于移除字符串首尾的空白字符，不会修改原字符串，而是返回一个新的
    //字符串
    const keys = path
      .split('')
      .filter((v) => v !== '[' && v !== ']' && v !== '.')
      .map((v) => {
        console.log(isNaN(v), '是不是数字');
        return !isNaN(v.trim()) ? Number(v) : v;
      });

    // 逐级访问对象属性
    let result = obj;
    for (const key of keys) {
      if (result === null || result === undefined) {
        return defaultValue;
      } else {
        result = result[key];
      }
    }
    console.log(result, 'kes11');
    // 如果最终结果不存在，返回默认值
    return result !== undefined ? result : defaultValue;
  }

  useEffect(() => {
    // 示例用法
    const object = { a: [{ b: { c: 3 } }] };
    console.log(get(object, 'a[0].b.c'), '周'); // 输出: 3
    // console.log(get(object, 'a.b.c', 'default'), 'jie'); // 输出: 'default'
    // console.log(get(object, 'a'), 'jie11'); // 输出: [{ b: { c: 3 } }]
  }, []);

  return <div>这里有啥自由</div>;
};
