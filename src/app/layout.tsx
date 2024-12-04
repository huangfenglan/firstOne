'use client';

import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import store from './store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User } from '@/services/userTs';

interface Redux {
  conut: { curUserInfo: User };
}

export const InnerContainer = ({ children }: { children: React.ReactNode }) => {
  const curUserInfo = useSelector(
    ({ conut: { curUserInfo } }: Redux) => curUserInfo
  );
  const router = useRouter();

  useEffect(() => {
    // const { phone } = curUserInfo;
    // if (!phone) {
    //   console.log('这里都有啥呀', curUserInfo, curUserInfo?.phone);
    //   router.push('/');
    // }
  }, [curUserInfo]);

  return <div>{children}</div>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider locale={zhCN}>
            <Provider store={store}>
              <InnerContainer children={children} />
            </Provider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
