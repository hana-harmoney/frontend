import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import BottomNav from '@/components/common/navbar/BottomNav';
import Script from 'next/script';
import NotificationProvider from '@/app/NotificationProvider';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'HanaHarmoney',
  description: 'Hana-Harmoney',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="/service-worker.js" />
      <body
        className={`${pretendard.className} overflow-x-hidden`}
        // style={{
        //   paddingTop: 'env(safe-area-inset-top)',
        //   paddingBottom: 'env(safe-area-inset-bottom)',
        //   paddingLeft: 'env(safe-area-inset-left)',
        //   paddingRight: 'env(safe-area-inset-right)',
        // }}
      >
        <NotificationProvider>
          {children}
          <BottomNav />
          <Toaster position="top-center" reverseOrder={false} />
        </NotificationProvider>
      </body>
    </html>
  );
}
