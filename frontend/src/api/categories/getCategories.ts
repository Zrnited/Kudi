import { api } from "../../lib/api";

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get("/api/categories");

  return response.data;
};
