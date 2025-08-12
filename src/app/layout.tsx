import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';

export const metadata: Metadata = {
  title: 'BECmaster',
  description: '面向中文用户的 BEC 英语学习平台',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
