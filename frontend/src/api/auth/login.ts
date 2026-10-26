import { AUTH_BASE } from ".";
import { api } from "../../lib/api";
import type { User } from "../../types/shared";

export const login = async (
  email: string,
  password: string,
): Promise<User> => {
  const data = {
    email: email,
    password: password,
  };

  const response = await api.post(`${AUTH_BASE}/signin`, data);
  return response.data;
};
