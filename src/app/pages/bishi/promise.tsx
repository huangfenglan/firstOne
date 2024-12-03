'use client';

import { Space } from 'antd';
import { resolve } from 'path';

export default () => {
  const getData1 = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(1), 2000);
    });
  };
  const getData12 = () => {
    console.log(222);
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(12), 3000);
    });
  };
  //测试promise.race
  const testOverTime = async () => {
    const data = await Promise.race([getData1(), getData12()]);
    console.log(data, '最终race的结果');
  };

  //测试promise.all
  const testAll = async () => {
    // const data = await Promise.all([getData1(), getData12()]);
    Promise.all([getData1(), getData12()])
      .then(() => {})
      .catch((res) => {
        console.log(res, 'catch');
      });
    // console.log(data, '最终all的结果');
  };
  return (
    <Space>
      <div
        onClick={() => {
          testOverTime();
        }}
      >
        这里需要race
      </div>
      <div
        onClick={() => {
          testAll();
        }}
      >
        这里需要all
      </div>
    </Space>
  );
};
