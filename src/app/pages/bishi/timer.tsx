import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

// 在线ide不习惯，可以本地完成，贴进来

/**
 * 券卡片渲染数据
 */
interface IDirectVoucher {
  /** 标题 */
  title?: string;
  /** 副标题 */
  subTitle?: string;
}

// 卡片数据
const cardDataList: IDirectVoucher[] = [
  {
    title: '杭州市通用5元券',
    subTitle:
      '杭味面馆非常好吃，太好吃了，相当不错，味道鲜美，特别划算，快快抢购，聚划算',
  },
  {
    title: '杭州市10元券',
    subTitle: '兰州拉面非常好吃',
  },
];

interface ICardProps {
  data: IDirectVoucher;
}

/** 请在这里实现功能 **/
export default (props) => {
  const { data } = props;
  let num = 1;
  const [count, setCount] = useState<number>(num);
  const [isClick, setIsClick] = useState<boolean>(false);

  const handlerTimer = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(count);
        resolve(1);
      }, 1000);
    });
  };

  const handler = async () => {
    const result = await handlerTimer();
    setCount(count + 1);
    console.log(result, '9999');
  };

  useEffect(() => {
    if (count <= 10) {
      handler();
    }
  }, [count]);

  const isShowQionggou = useMemo(() => {
    return count >= 10;
  }, [count]);

  const clickQuan = () => {
    setIsClick(true);
  };

  return (
    <div className="card">
      <div>{data?.title}</div>
      <div>{data?.subTitle}</div>
      <div onClick={() => clickQuan()}>
        {isShowQionggou ? (isClick ? '已抢购' : '抢购') : `${count}s`}
      </div>
    </div>
  );
};
