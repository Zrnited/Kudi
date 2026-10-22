import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main>
      <h1>Dashboard Layout!</h1>
      <Outlet />
    </main>
  );
}
