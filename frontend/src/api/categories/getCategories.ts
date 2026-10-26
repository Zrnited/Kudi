import { api } from "../../lib/api";
import type { User } from "../../types/shared";

export const getCategories = async (): Promise<User> => {
  const response = await api.get("/api/categories");

  return response.data;
};
