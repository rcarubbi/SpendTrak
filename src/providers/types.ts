import type { Transaction } from "../types";

export interface UploadProvider {
  id: string;
  name: string;
  accept: string;
  detectByExtension(fileName: string): boolean;
  parse(file: File): Promise<ParseResult>;
}

export interface ParseResult {
  transactions: Transaction[];
  months: string[];
  total: number;
  debug?: string;
}
