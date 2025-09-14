'use client';
import { useEffect } from 'react';
import { Modal, Button } from 'antd';

export default () => {
  const styles: any = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    background: 'rgba(0,0,0,.5)',
    lineHeight: '100%',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  };

  const middleDiv = {
    width: '500px',
    height: '200px',
    background: '#fff',
    // positon: 'absolute',
    // right: '50%',
    // top: '50%',
    display: 'inlineBlock',
  };

  const initFunc = () => {
    console.log('当前目标数据222');
    document.onclick = (e) => {
      console.log(e.target, '当前目标数据');
    };
  };

  useEffect(() => {
    initFunc();
    return () => {
      document.removeEventListener('click');
    };
  }, []);

  return (
    <div>
      <Button>打开弹窗</Button>
      <div id="overly" style={{ ...styles }}>
        <div id="model" style={{ ...middleDiv }}>
          弹窗
        </div>
      </div>
    </div>
  );
};
