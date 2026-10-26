import { TRANSACTION_BASE } from ".";
import { api } from "../../lib/api";
import type { Category } from "../../types/shared";

export const addTransaction = async (
  title: string,
  category: Category,
  amount: number,
  date: string,
  type: "income" | "expense",
  note?: string,
): Promise<any> => {
  const data = {
    title,
    category,
    amount,
    date,
    type,
    note,
  };

  const response = await api.post(`${TRANSACTION_BASE}`, data);
  return response.data;
};
