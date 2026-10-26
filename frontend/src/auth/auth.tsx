import type { ReactNode } from "react";
// import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context";
import DashboardLoadingInterface from "../components/dashboard/loading-interface";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function Auth({ children }: ProtectedRouteProps) {
  const { user, fetchingUser } = useAppContext();
  
  if (fetchingUser) return <DashboardLoadingInterface />;

  return user ? <>{children}</> : <Navigate to="/" replace />;
}
