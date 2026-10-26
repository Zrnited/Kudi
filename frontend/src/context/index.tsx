/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/shared";
import { getMe } from "../api/auth/getMe";

interface AppContextTypes {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchingUser: boolean;
}

const defaultContextValues: AppContextTypes = {
  user: null,
  setUser: () => {},
  fetchingUser: true,
};

const AppContext = createContext<AppContextTypes>(defaultContextValues);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [fetchingUser, setFetchingUser] = useState<boolean>(true);

  const getUser = async (cancelled: boolean) => {
    await getMe()
      .then((res) => !cancelled && setUser(res))
      .catch(
        () => !cancelled && (setUser(null), console.log("user not found.")),
      )
      .finally(() => !cancelled && setFetchingUser(false));
  };

  //runs every page load or refresh
  useEffect(() => {
    let cancelled = false;
    getUser(cancelled);
    return () => {
      cancelled = true;
    };
  }, []);

  const value = {
    user,
    setUser,
    fetchingUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider.");
  }
  return context;
};
