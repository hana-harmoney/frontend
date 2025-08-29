import { apiClient } from './client';
export const fetchAccountName = async (accountNumber: string) => {
  const request = { account_num: accountNumber };

  const res = await apiClient('/transfer/name', {
    method: 'POST',
    body: JSON.stringify(request),
  });
  return res.result;
};

export const transfer = async (
  accountNumber: string,
  accountName: string,
  amount: number,
) => {
  const request = {
    toAccountNum: accountNumber,
    toAccountName: accountName,
    amount: amount,
  };

  const res = await apiClient('/transfer', {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return res;
};
