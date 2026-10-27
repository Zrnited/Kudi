import type { Category } from "./shared";

type Breakdown = {
  category: Category;
  lastMonthSpending: number;
  currMonthSpending: number;
};

interface Comparison {
  title: string; // "Compared to September 2026"
  lastTotalSpending: number;
  currTotalSpending: number;
  percentageChange: string | null;
  breakdown: Breakdown[];
}

interface ByCategory {
  category: Category;
  totalSpent: number;
  percentageSpent: string; // share of this month's total, e.g. "45.5"
}

export interface Summary {
  period: string; // "October 2026"
  comparison: Comparison;
  byCategory: ByCategory[];
}
