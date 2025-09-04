import { apiClient } from './client';
import { FinanceExpenseResponse, FinanceIncomeResponse } from '@/types/finance';

export const fetchIncome = async (
  month: number,
): Promise<FinanceIncomeResponse> => {
  const res = await apiClient(`/finance/income?month=${month}`);

  if (res.code !== '200') throw new Error('수입 내역 조회 실패');
  return res.result;
};

export const fetchExpense = async (
  month: number,
): Promise<FinanceExpenseResponse> => {
  const res = await apiClient(`/finance/expense?month=${month}`);

  if (res.code !== '200') throw new Error('지출 내역 조회 실패');
  return res.result;
};
