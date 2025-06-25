'use client';

import { useEffect } from 'react';

export default () => {
  const flatArray = [
    { id: 1, parentId: null, name: '节点1' },
    { id: 2, parentId: 1, name: '节点1-1' },
    { id: 3, parentId: 1, name: '节点1-2' },
    { id: 4, parentId: 2, name: '节点1-1-1' },
    { id: 5, parentId: 3, name: '节点1-2-1' },
    { id: 6, parentId: null, name: '节点2' },
  ];

  //使用递归和 reduce 方法
  const handlerAcc = (acc, node) => {
    const { parentId } = node;
    acc.forEach((element) => {
      const isHas = parentId === element?.id;
      const { children = [] } = element;
      if (!isHas) {
        if (element?.children && element?.children?.length) {
          handlerAcc(element?.children, node);
        } else {
          element.children = [];
        }
      } else {
        element.children = [...children, { ...node }];
        return;
      }
    });
  };

  const buildTreeWithReduce = (flatArray) => {
    return flatArray.reduce((acc, node) => {
      !!node?.parentId ? handlerAcc(acc, node) : acc.push(node);
      return acc;
    }, []);
  };

  const buildTreeWithObj = (flatArray) => {
    const map: any = {};
    const arr: any = [];
    flatArray.forEach((element) => {
      const { id } = element;
      map[id] = { ...element, children: [] };
    });
    console.log(map, '之类有啥');

    flatArray.forEach((element) => {
      const { parentId, id, name } = element;
      if (parentId) {
        const parent = map[parentId];
        parent.children.push(map[id]);
      } else {
        arr.push(map[id]);
      }
    });
    console.log(arr, 'arr的数据');

    return arr;
  };
  // 利用两层filter实现
  function getData(arr) {
    // 利用两层filter实现
    let data = arr.filter((item) => {
      item.children = arr.filter((e) => {
        return item.id === e.parentId;
      });
      return !item.parentId;
    });

    return data;
  }
  const res = getData(flatArray);
  console.log('res', res);

  return (
    <>
      <h1>扁平数组转化为树结构</h1>
      <div
        onClick={() => {
          const treeWithReduce = buildTreeWithReduce(flatArray);
          console.log(treeWithReduce, 'treeWithReduce');
        }}
      >
        reduce方法
      </div>

      <div
        onClick={() => {
          const treeWithReduce = buildTreeWithObj(flatArray);
          console.log(treeWithReduce, 'buildTreeWithObj');
        }}
      >
        使用对象引用和递归
      </div>
    </>
  );
};
