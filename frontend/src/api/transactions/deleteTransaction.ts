import { TRANSACTION_BASE } from ".";
import { api } from "../../lib/api";

export const deleteTransaction = async (id: number) => {
  const response = await api.delete(`${TRANSACTION_BASE}/${id}`);
  return response.data;
};
