'use client';

import localFont from "next/font/local";
import "./globals.css";
import {useEffect} from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import CustomedLayout from "@/Components/CustomedLayout";
import store from './store';
import { Provider } from 'react-redux';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(()=>{
    console.log(22);
    
  },[])
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <Provider store={store}>
            <CustomedLayout>
              {children}
            </CustomedLayout>
          </Provider>    
        </AntdRegistry>
      </body>
    </html>
  );
}
