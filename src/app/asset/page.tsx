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
import StackedBarChart from '@/components/ui/barChart';
import { stackedBarData } from '@/types/stackedBar';
import IncomePastHistoryBottomSheet from '@/components/asset/IncomePastHistoryBottomSheet';
import EconomicEdu from '@/assets/images/economic_edu.svg';
import { useRouter } from 'next/navigation';
import { fetchPastHarmoneyIncome } from '@/lib/api/report';
import { IncomeData } from '@/types/report';

const AssetPage = () => {
  const [userName, setUserName] = useState('');
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const router = useRouter();

  const [assetData, setAssetData] = useState<AssetData>({
    userName: '',
    incomeData: [],
    expenseData: [],
  });

  const [incomeBarData, setIncomeBarData] = useState<stackedBarData[]>([]);
  const [expenseBarData, setExpenseBarData] = useState<stackedBarData[]>([]);
  const [harmoneyIncomeData, setHarmoneyIncomeData] = useState<IncomeData[]>(
    [],
  );
  const [thisMonthHarmoneyIncome, setThisMonthHarmoneyIncome] = useState(0);

  const [selectedId, setSelectedId] = useState(0);
  const tabs = [
    { id: 0, name: '수익' },
    { id: 1, name: '지출' },
  ];

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const [data, incomeResponse, expenseResponse] = await Promise.all([
          fetchProfile(),
          fetchIncome(8),
          fetchExpense(8),
        ]);
        if (ignore) return;

        const harmoneyIncomeResponse = await fetchPastHarmoneyIncome();

        const today = new Date(Date.now());
        const parsed = harmoneyIncomeResponse
          .map((income) => {
            const date = new Date(income.month);

            if (date.getMonth() === today.getMonth()) {
              setThisMonthHarmoneyIncome(income.monthlyAmount);
            }

            return {
              date: date,
              month: date.getMonth() + 1,
              income: income.monthlyAmount,
            };
          })
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(Math.max(harmoneyIncomeResponse.length - 4, 0));

        setUserName(data.nickname);

        const incomeData = [
          { id: 0, name: '연금', amount: incomeResponse.pension },
          { id: 1, name: '임대소득', amount: incomeResponse.rentIncome },
          { id: 2, name: '하모니', amount: incomeResponse.harmoneyIncome },
          { id: 3, name: '기타', amount: incomeResponse.otherIncome },
          { id: 4, name: '합계', amount: incomeResponse.totalIncome },
        ];

        const expenseData = [
          { id: 0, name: '생활비', amount: expenseResponse.livingExpense },
          { id: 1, name: '의료비', amount: expenseResponse.medicalExpense },
          { id: 2, name: '여가비', amount: expenseResponse.leisureExpense },
          { id: 3, name: '기타', amount: expenseResponse.otherExpense },
          { id: 4, name: '합계', amount: expenseResponse.totalExpense },
        ];

        setIncomeBarData([
          { label: '연금', value: incomeResponse.pension, color: '#4D5DAB' },
          {
            label: '임대소득',
            value: incomeResponse.rentIncome,
            color: '#85BBF3',
          },
          {
            label: '하모니',
            value: incomeResponse.harmoneyIncome,
            color: '#BDDEFF',
          },
          {
            label: '기타',
            value: incomeResponse.otherIncome,
            color: '#C8C7DE',
          },
        ]);

        setExpenseBarData([
          {
            label: '생활',
            value: expenseResponse.livingExpense,
            color: '#8E81C6',
          },
          {
            label: '의료',
            value: expenseResponse.medicalExpense,
            color: '#B1A1F8',
          },
          {
            label: '여가',
            value: expenseResponse.leisureExpense,
            color: '#E7E2FD',
          },
          {
            label: '기타',
            value: expenseResponse.otherExpense,
            color: '#F3F1FE',
          },
        ]);

        setAssetData({ userName: data.nickname, incomeData, expenseData });
        setHarmoneyIncomeData(parsed);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      ignore = true;
    };
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
    setOpenBottomSheet(true);
  };

  return (
    <div className="flex w-full flex-col bg-white">
      <Header
        title={`${userName} 님의 자산 분석`}
        centerTitle={false}
        showBackButton={false}
      />
      <div className="flex flex-col gap-6 px-6">
        <div
          onClick={() => {
            router.push('/education');
          }}
        >
          <EconomicEdu className="mt-3 -mb-2 h-[76px] w-full" />
        </div>
        <div className="bg-hana-green-light flex w-full flex-col gap-4 rounded-md px-4 py-6 text-2xl font-semibold">
          <div className="flex items-center justify-between">
            9월 하모니 수입
            <span className="text-[16px] font-light" onClick={pastClick}>
              지난 내역 보기 &gt;
            </span>
          </div>
          <div>
            <span className="text-main">
              {formatNumber(thisMonthHarmoneyIncome)}
            </span>{' '}
            원
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="px-1 text-xl font-semibold">8월 수입·지출</div>
          <div className="flex flex-col gap-4 rounded-md p-3">
            <StackedBarChart
              name="수익"
              data={incomeBarData}
              total={assetData.incomeData.at(-1)?.amount ?? 0}
            />
            <StackedBarChart
              name="지출"
              data={expenseBarData}
              total={assetData.expenseData.at(-1)?.amount ?? 0}
            />
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
                    className={`flex items-center justify-between text-lg font-semibold ${income.id == 4 && 'border-t-teduri border-t pt-3'}`}
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
                    className={`flex items-center justify-between text-lg font-semibold ${expense.id == 4 && 'border-t-teduri border-t pt-3'}`}
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
      <IncomePastHistoryBottomSheet
        open={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
        data={harmoneyIncomeData}
      />
    </div>
  );
};

export default AssetPage;
