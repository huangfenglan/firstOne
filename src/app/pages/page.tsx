'use client';

import React, { useEffect } from 'react';
import { changeName } from '@/store/commonstate';
import CustomedLayout from '@/Components/CustomedLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { resolve } from 'path';
import { log } from 'console';

const App: React.FC = () => {
  const test1 = () => {
    const promise1 = new Promise((resolve) => {
      // resolve('这里是测试1');
    });
    // const promise2 = promise1.then((res) => {
    //   console.log(res, '这里到底是啥11');
    //   return '这里是测试2';
    // });
    // .then((res) => {
    //   console.log(res, '这里到底是啥22');
    //   return '这里是第二个then';
    // });

    return promise1;
  };

  const test = async () => {
    console.log('这里已经开始运行了');

    const data = await test1().then((val) => console.log(val, '这里有数据吗'));
    console.log(data, '这里到底是啥');
  };

  const userInfo = useSelector((state: any) => {
    return state?.commonstate;
  });
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{userInfo?.name}</h1>
      欢迎来到我的项目121
      <Button
        type="primary"
        onClick={() => {
          test();
          // dispatch(changeName('王菲'));
        }}
      >
        更改用户姓名
      </Button>
    </div>
  );
};

export default App;
