import { useEffect, useState } from "react";
import Transactions from "../components/dashboard/transactions";
import Budgets from "../components/dashboard/budgets";
import Summary from "../components/dashboard/summary";
import { getCategories } from "../api/categories/getCategories";
import type { ApiError } from "../lib/api";
import { toast } from "sonner";

type action = "transactions" | "summary" | "budgets";

export default function Dashboard() {
  const [action, setAction] = useState<action>("transactions");
  const [categories, setCategories] = useState<string[] | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);

  const fetchCategories = async () => {
    await getCategories()
      .then((res) => setCategories(res))
      .catch((e: ApiError) => toast.error(e.message))
      .finally(() => setIsLoadingCategories(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="mt-3 space-y-4">
      {/* navigator */}
      <div className="w-full bg-secondary p-1 rounded-xl h-10 gap-x-2 flex items-center text-sm">
        {/* navbar */}
        <button
          onClick={() => setAction("transactions")}
          className={`w-1/2 h-full rounded-xl cursor-pointer transition ease-in-out delay-100 ${action === "transactions" ? "bg-white font-semibold" : "bg-none"}`}
        >
          Transactions
        </button>
        <button
          onClick={() => setAction("summary")}
          className={`w-1/2 h-full rounded-xl cursor-pointer transition ease-in-out delay-100 ${action === "summary" ? "bg-white font-semibold" : "bg-none"}`}
        >
          Summary
        </button>
        <button
          onClick={() => setAction("budgets")}
          className={`w-1/2 h-full rounded-xl cursor-pointer transition ease-in-out delay-100 ${action === "budgets" ? "bg-white font-semibold" : "bg-none"}`}
        >
          Budgets
        </button>
      </div>
      {/* transactions */}
      {action === "transactions" && <Transactions categories={categories} isLoadingCategories={isLoadingCategories} />}
      {action === "budgets" && <Budgets />}
      {action === "summary" && <Summary />}
    </section>
  );
}
