import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.ts',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'harmoneybucket.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_WS_URL!;
    return [
      {
        source: '/ws-stomp/:path*',
        destination: `${backend}/:path*`,
      },
    ];
  },
};

export default nextConfig;
