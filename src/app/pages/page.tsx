'use client';

import React from 'react';
import { changeName } from '@/store/commonstate';
import CustomedLayout from '@/Components/CustomedLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

const App: React.FC = () => {
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
          dispatch(changeName('王菲'));
        }}
      >
        更改用户姓名
      </Button>
    </div>
  );
};

export default App;
