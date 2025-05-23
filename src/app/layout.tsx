import type { Metadata } from 'next';

import './globals.css';

import { Footer } from './_components/_Footer/Footer';
import { Header } from './_components/_Header/Header';

export const metadata: Metadata = {
  title: 'ちりつも',
  description: '無駄な消費を我慢して欲しい物を手に入れよう！',
  keywords: ['ちりつも', '貯金', '節約', '無駄づかい', '家計簿'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://chiritsumo-14.vercel.app',
    siteName: 'ちりつも',
    title: 'ちりつも',
    description: '無駄な消費を我慢して欲しい物を手に入れよう！',
    images: [
      {
        url: 'https://chiritsumo-14.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ちりつも'
      }
    ]
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-icon.ico'
    }
  },
  appleWebApp: true
};
<meta name="apple-mobile-web-app-capable" content="yes"></meta>;

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body className="min-h-[calc(100vh-132px)] bg-white text-gray-800">
        <Header />
        <div className="flex min-h-screen flex-col">
          <div className="flex-grow px-[7%] py-24 sm:px-[5%]">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
