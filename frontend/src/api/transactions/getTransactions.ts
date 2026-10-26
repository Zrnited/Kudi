import { TRANSACTION_BASE } from ".";
import { api } from "../../lib/api";
import type { Category } from "../../types/shared";

interface TransactionResponse {
  amount: number;
  category: Category;
  date: string;
  id: number;
  note: string;
  title: string;
  type: "expense" | "income";
}

export const getTransactions = async (): Promise<TransactionResponse[]> => {
  const response = await api.get(`${TRANSACTION_BASE}`);
  return response.data;
};
