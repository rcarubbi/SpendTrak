export type CategoryType = "debit" | "credit";

export interface Category {
  id: string;
  name: string;
  color: string;
  keywords: string[];
  type: CategoryType;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  subcategory: string;
  categoryId: string;
  account: string;
  source: string;
  manual?: boolean;
}

export interface CsvRow {
  number: string;
  date: string;
  account: string;
  amount: string;
  subcategory: string;
  memo: string;
}

export interface MonthData {
  year: number;
  month: number;
  transactions: Transaction[];
  uploadedAt: string;
}

export interface Budget {
  categoryId: string;
  year: number;
  month: number;
  amount: number;
}
