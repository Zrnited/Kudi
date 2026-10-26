import { api } from "../../lib/api";
import type { User } from "../../types/shared";

export const register = async (
  full_name: string,
  email: string,
  password: string,
): Promise<User> => {
  const data = {
    name: full_name,
    email,
    password,
  };

  const response = await api.post("/api/users/register", data);
  return response.data;
};
