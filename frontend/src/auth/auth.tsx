import type { ReactNode } from "react";
// import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function Auth({ children }: ProtectedRouteProps) {
  const token = true
//   const token = Cookies.get("sessionId");

  return token ? <>{children}</> : <Navigate to="/" replace />;
}
