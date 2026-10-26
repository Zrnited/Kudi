import { AUTH_BASE } from ".";
import { api } from "../../lib/api";
import type { User } from "../../types/shared";

export const getMe = async (): Promise<User> => {
  const response = await api.get(`${AUTH_BASE}/me`);

  return response.data;
};
