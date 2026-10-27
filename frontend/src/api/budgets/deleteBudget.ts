import { BUDGET_BASE } from ".";
import { api } from "../../lib/api";

export const deleteBudget = async (id: number) => {
  const response = await api.delete(`${BUDGET_BASE}/${id}`);
  return response.data;
};
