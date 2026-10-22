import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function DashboardLayout() {
  return (
    <main>
      <Navbar />
      <section className="p-5 mx-auto max-w-4xl">
        <Outlet />
      </section>
    </main>
  );
}
