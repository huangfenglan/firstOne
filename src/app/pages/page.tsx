'use client';
 
import React from 'react';
import {changeName} from '@/store/userInfo'
import CustomedLayout from '@/Components/CustomedLayout'
import { useSelector, useDispatch } from 'react-redux';

const App: React.FC = () => {
  const userInfo=useSelector((state)=>{
    console.log(state,"useSelector12");
    return state
    
  })
  const dispatch = useDispatch();
  return <div onClick={()=>{
    // const str:string='黄凤兰'
    console.log(userInfo)
  }}>
    欢迎来到我的项目121
  </div>
}

export default App;