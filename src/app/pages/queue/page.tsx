'use client';

import { Button } from 'antd';
import { useEffect } from 'react';
import Com from './Com';

let exam: any;
export default () => {
  class BlockingQueue {
    semaphore: any;
    queue: any;
    constructor() {
      this.queue = [];
      this.semaphore = { value: 0 };
    }

    enqueue(item: any) {
      this.queue.push(item);
      this.semaphore.value++;
      if (this.semaphore.value === 1) {
        this.semaphore.resolve();
      }
    }

    dequeue() {
      if (!this.semaphore.value) {
        return new Promise((resolve) => {
          this.semaphore.resolve = resolve;
        });
      }
      const item = this.queue.shift();
      this.semaphore.value--;
      return Promise.resolve(item);
    }
  }

  useEffect(() => {
    exam = new BlockingQueue();
  }, []);

  // 生产者
  const producer = async () => {
    for (let i = 1; i <= 5; i++) {
      await exam.enqueue(i);
      console.log(`Produced: ${i}`);
    }
  };

  // 消费者
  const consumer = async () => {
    for (let i = 0; i < 4; i++) {
      const item = await exam.dequeue();
      console.log(`Consumed: ${item}`);
    }
  };

  return (
    <div>
      <Button onClick={consumer}>消费者</Button>
      <Button onClick={producer}>生产者</Button>
      <div>
        <Com />
      </div>
    </div>
  );
};
