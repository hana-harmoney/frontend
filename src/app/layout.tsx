import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import BottomNav from '@/components/common/navbar/BottomNav';

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
      <body
        className={`${pretendard.className} flex justify-center overflow-x-hidden`}
        // style={{
        //   paddingTop: 'env(safe-area-inset-top)',
        //   paddingBottom: 'env(safe-area-inset-bottom)',
        //   paddingLeft: 'env(safe-area-inset-left)',
        //   paddingRight: 'env(safe-area-inset-right)',
        // }}
      >
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
