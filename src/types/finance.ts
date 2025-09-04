export type FinanceIncomeResponse = {
  month: number;
  pension: number;
  rentIncome: number;
  harmoneyIncome: number;
  otherIncome: number;
  totalIncome: number;
};

export type FinanceExpenseResponse = {
  month: number;
  livingExpense: number;
  medicalExpense: number;
  leisureExpense: number;
  otherExpense: number;
  totalExpense: number;
};

type IncomeItem = { id: number; name: string; amount: number };
type ExpenseItem = { id: number; name: string; amount: number };
export type AssetData = {
  userName: string;
  incomeData: IncomeItem[];
  expenseData: ExpenseItem[];
};
