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
              svgo: true,
              svgoConfig: {
                plugins: [
                  { name: 'removeViewBox', active: false },
                  { name: 'convertColors', params: { currentColor: true } },
                ],
              },
            },
          },
        ],
        as: '*.js', // SVG -> JS(리액트 컴포넌트)로 다뤄라
      },
    },
  },
};

export default nextConfig;
