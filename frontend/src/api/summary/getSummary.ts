import { SUMMARY_BASE } from ".";
import { api } from "../../lib/api";
import type { Summary } from "../../types/summary";

export const getSummary = async (month?: string): Promise<Summary> => {
  const baseUrl = month ? `${SUMMARY_BASE}?month=${month}` : SUMMARY_BASE;

  const response = await api.get(baseUrl);
  return response.data;
};
