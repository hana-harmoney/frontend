'use client';
import Header from '@/components/common/header';
import React, { useEffect, useState } from 'react';
import TabBar from '@/components/home/TabBar';
import { formatNumber } from '@/lib/utils';
import { imgUrlItem } from '@/types/profile';
import ImageSlider from '@/components/profile/ImageSlider';
import { fetchProfile } from '@/lib/api/profile';
import { fetchExpense, fetchIncome } from '@/lib/api/finance';
import { AssetData } from '@/types/finance';

const AssetPage = () => {
  const [userName, setUserName] = useState('');

  const [assetData, setAssetData] = useState<AssetData>({
    userName: '',
    incomeData: [],
    expenseData: [],
  });

  const [selectedId, setSelectedId] = useState(0);
  const tabs = [
    { id: 0, name: '수익' },
    { id: 1, name: '지출' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProfile();
        const incomeResponse = await fetchIncome(8);
        const expenseResponse = await fetchExpense(8);
        setUserName(data.nickname);

        const incomeData = [
          { id: 0, name: '연금', amount: incomeResponse.pension },
          { id: 1, name: '임대소득', amount: incomeResponse.rentIncome },
          { id: 2, name: '하모니', amount: incomeResponse.harmoneyIncome },
          { id: 3, name: '기타', amount: incomeResponse.otherIncome },
        ];

        const expenseData = [
          { id: 0, name: '생활비', amount: expenseResponse.livingExpense },
          { id: 1, name: '의료비', amount: expenseResponse.medicalExpense },
          { id: 2, name: '여가비', amount: expenseResponse.leisureExpense },
          { id: 3, name: '기타', amount: expenseResponse.otherExpense },
        ];

        setAssetData({
          userName: data.nickname,
          incomeData: incomeData,
          expenseData: expenseData,
        });
      } catch (e) {
      } finally {
      }
    })();
  }, []);

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
              assetData.incomeData.map((income, idx) => {
                return (
                  <div
                    className="flex items-center justify-between text-lg font-semibold"
                    key={idx}
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
              assetData.expenseData.map((expense, idx) => {
                return (
                  <div
                    className="flex items-center justify-between text-lg font-semibold"
                    key={idx}
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
