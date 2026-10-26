import { AUTH_BASE } from ".";
import { api } from "../../lib/api";

export const logout = async () => {
  const response = await api.post(`${AUTH_BASE}/signout`);
  return response.data;
};
