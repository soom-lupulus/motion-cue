import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Motion Cue · 动效与视觉特效学术词典 (Remotion AI 提示词库)',
  description:
    '解决“脑子里有画面但叫不出名字”的痛点。专为 Remotion 编程式视频渲染、前端交互设计与 AI 视频生成打造的专业术语与动效提示词库。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-neutral-100">{children}</body>
    </html>
  );
}
