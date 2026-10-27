import { BUDGET_BASE } from ".";
import { api } from "../../lib/api";
import type { Category } from "../../types/shared";

interface Request {
  title: string;
  startDate: string;
  endDate: string;
  budget: {
    category: Category;
    amountBudgeted: number;
  }[];
}

export const addBudget = async (budget: Request): Promise<any> => {
  const response = await api.post(`${BUDGET_BASE}`, budget);
  return response.data;
};
