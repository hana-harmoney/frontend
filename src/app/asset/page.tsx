'use client';
import Header from '@/components/common/header';
import React, { useEffect, useState } from 'react';
import TabBar from '@/components/home/TabBar';
import { formatNumber } from '@/lib/utils';
import { imgUrlItem } from '@/types/profile';
import ImageSlider from '@/components/profile/ImageSlider';

const AssetPage = () => {
  const [userName, setUserName] = useState('');

  const [selectedId, setSelectedId] = useState(0);
  const tabs = [
    { id: 0, name: '수익' },
    { id: 1, name: '지출' },
  ];

  useEffect(() => {
    setUserName('송유림');
  }, []);

  const incomeData = [
    { id: 0, name: '연금', amount: 720000 },
    { id: 1, name: '임대소득', amount: 1500000 },
    { id: 2, name: '하모니', amount: 300000 },
    { id: 3, name: '기타', amount: 50000 },
  ];

  const expenseData = [
    { id: 0, name: '생활', amount: 500000 },
    { id: 1, name: '의료', amount: 200000 },
    { id: 2, name: '여가', amount: 120000 },
    { id: 3, name: '기타', amount: 40000 },
  ];

  const imageData: imgUrlItem[] = [
    { id: 1, url: '/images/asset/banner-1.png' },
    { id: 2, url: '/images/asset/banner-2.png' },
    { id: 3, url: '/images/asset/banner-3.png' },
    { id: 4, url: '/images/asset/banner-4.png' },
    { id: 5, url: '/images/asset/banner-5.png' },
    { id: 6, url: '/images/asset/banner-6.png' },
    { id: 7, url: '/images/asset/banner-7.png' },
    { id: 8, url: '/images/asset/banner-8.png' },
  ];

  const pastClick = () => {
    console.log('pastClick');
  };

  return (
    <div className="flex w-full flex-col bg-white">
      <Header
        title={`${userName} 님의 자산 분석`}
        centerTitle={false}
        showBackButton={false}
      />
      <div className="flex flex-col gap-6 px-6">
        <div className="bg-hana-green-light flex w-full flex-col gap-4 rounded-md px-4 py-6 text-2xl font-semibold">
          <div className="flex items-center justify-between">
            9월 하모니 수입
            <span className="text-[16px] font-light" onClick={pastClick}>
              지난 내역 보기 &gt;
            </span>
          </div>
          <div>
            <span className="text-main">50,000</span> 원
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TabBar
            tabs={tabs}
            selectedId={selectedId}
            clickTab={setSelectedId}
          />
          <div className="flex flex-col gap-3">
            {selectedId == 0 &&
              incomeData.map((income) => {
                return (
                  <div
                    className="flex items-center justify-between text-lg font-semibold"
                    key={income.id}
                  >
                    {income.name}
                    <div className="flex items-center gap-1">
                      {formatNumber(income.amount)}
                      <span className="font-light">원</span>
                    </div>
                  </div>
                );
              })}
            {selectedId == 1 &&
              expenseData.map((expense) => {
                return (
                  <div
                    className="flex items-center justify-between text-lg font-semibold"
                    key={expense.id}
                  >
                    {expense.name}
                    <div className="flex items-center gap-1">
                      {formatNumber(expense.amount)}
                      <span className="font-light">원</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <ImageSlider images={imageData} autoplay={true} />
      </div>
    </div>
  );
};

export default AssetPage;
