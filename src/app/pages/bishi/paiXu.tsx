'use client';
import { Button, Space } from 'antd';
import { useEffect } from 'react';

export default () => {
  const obj = {
    12: '12',
    9: '9',
    1: '1',
  };
  /**
   * 冒泡排序
   * arr:需要排序的数字
   */
  const bubbleSort = (arr: number[]) => {
    if (arr.length <= 0) {
      return arr;
    }
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  };

  /**
   * 快速排序
   * array:需要排序的数字
   */
  const quickSort = (array) => {
    if (array.length <= 1) {
      return array;
    }
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array.splice(pivotIndex, 1)[0];
    // let pivot = array[0];
    const leftArray = [];
    const rightArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] < pivot) {
        leftArray.push(array[i]);
      } else {
        rightArray.push(array[i]);
      }
    }
    return quickSort(leftArray).concat([pivot], quickSort(rightArray));
  };

  /**
   * 插入排序
   * arr:需要排序的数字
   */

  const insertSort = (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  };

  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            let numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
            console.log(bubbleSort(numbers), 'numbers', numbers);
          }}
        >
          冒泡
        </Button>
        <Button
          onClick={() => {
            let numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
            console.log(quickSort(numbers), 'numbers', numbers);
          }}
        >
          快速排序
        </Button>
        <Button
          onClick={() => {
            let numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
            console.log(insertSort(numbers), 'numbers', numbers);
          }}
        >
          插入排序
        </Button>
      </Space>
    </div>
  );
};
