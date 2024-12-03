'use client';

export default () => {
  const arrIn = [5, [[4, 3], 2, 1]];
  // const arrIn = [5, [[4, 3]], 9];
  const test = (arr: any[]) => {
    const data = arr.reduce((ite, item: any, index: number) => {
      const isArr = Array.isArray(item);
      item = isArr ? test(item) : item;
      return index >= 1 ? ite - item : item;
    }, 0);
    console.log(data, '00000', arr);
    return data;
  };

  const subtract = (arr) => {
    const isArr = Array.isArray(arr);
    if (isArr) {
      return arr.reduce((a, b, index) => {
        const finalData = Array.isArray(b) ? subtract(b) : b;
        const data = index >= 1 ? a - finalData : finalData;
        return data;
      }, 0);
    } else {
      return arr;
    }
  };
  return (
    <div>
      <div
        onClick={() => {
          console.log(test(arrIn), '最后的结果');
        }}
      >
        减法
      </div>
      <div
        onClick={() => {
          console.log(subtract(arrIn), '最后的结果');
        }}
      >
        简单
      </div>
    </div>
  );
};
