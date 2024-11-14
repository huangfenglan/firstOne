'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';

interface InterviewTitle {
  title: string;
  path: string;
}

export default () => {
  const router = useRouter();
  const interviewTitles: InterviewTitle[] = [
    { title: '微前端', path: '/pages/interview/microApp' },
  ];

  return (
    <div>
      {interviewTitles.map(({ title, path }: InterviewTitle) => (
        <Button onClick={() => router.push(path)}>{title}</Button>
      ))}
    </div>
  );
};
