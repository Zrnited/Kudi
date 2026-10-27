import { BUDGET_BASE } from ".";
import { api } from "../../lib/api";
import type { Category } from "../../types/shared";

type BudgetItem = {
  category: Category;
  amountBudgeted: number;
  status: "on-track" | "over";
  amountUsed: number;
  amountRemaining: number;
  percentageUsed: string;
};

export interface Budget {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  budget: BudgetItem[];
  totalBudgeted: number;
  totalSpent: number;
  createdAt: string;
}

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await api.get(`${BUDGET_BASE}`);
  return response.data;
};
