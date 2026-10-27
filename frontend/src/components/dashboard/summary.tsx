import { ArrowUpRight, ChevronDown, DollarSign } from "lucide-react";
import StatCard from "./stat-card";
import type { TransactionResponse } from "../../api/transactions";
import { getSummary } from "../../api/summary";
import { useEffect, useState } from "react";
import type { action } from "../../pages/Dashboard";
import type { Summary } from "../../types/summary";

interface Props {
  allTr: TransactionResponse[];
  action: action;
}

//10-2026

export default function Summary({ allTr, action }: Props) {
  const [mySummary, setMySummary] = useState<Summary>();
  const [fetchSmErr, setFetchSmErr] = useState<boolean>(false);
  const [isFetchingSumm, setIsFetchingSumm] = useState<boolean>(false);
  const [filter, setFilter] = useState<{ month: string; year: string }>({
    month: "",
    year: "",
  });

  // const total_expenses: number = allTr
  //   .filter((tr) => tr.type === "expense")
  //   .reduce((sum, e) => sum + e.amount, 0);
  // const total_income: number = allTr
  //   .filter((tr) => tr.type === "income")
  //   .reduce((sum, e) => sum + e.amount, 0);

  // const total_kept: number = total_income - total_expenses;

  const months: { id: string; title: string }[] = [
    {
      id: "01",
      title: "January",
    },
    {
      id: "02",
      title: "February",
    },
    {
      id: "03",
      title: "March",
    },
    {
      id: "04",
      title: "April",
    },
    {
      id: "05",
      title: "May",
    },
    {
      id: "06",
      title: "June",
    },
    {
      id: "07",
      title: "July",
    },
    {
      id: "08",
      title: "August",
    },
    {
      id: "09",
      title: "September",
    },
    {
      id: "10",
      title: "October",
    },
    {
      id: "11",
      title: "November",
    },
    {
      id: "12",
      title: "December",
    },
  ];
  const years = Array.from({ length: 5 }, (_, i) => String(2026 + i));

  const fetchSummary = async (month?: string) => {
    if (action !== "summary") return;
    await getSummary(month && month)
      .then((res) => setMySummary(res))
      .catch(() => setFetchSmErr(true))
      .finally(() => {
        setIsFetchingSumm(false);
        if (filter.month.trim() || filter.year.trim())
          setFilter({ month: "", year: "" });
      });
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="space-y-7 mt-4">
      <div className="space-y-1">
        <p className="capitalize">filter summary</p>
        <div className="flex items-center gap-x-3 text-sm">
          <div className="w-50 relative">
            <select
              value={filter.month}
              name="month"
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, month: e.target.value }));
              }}
              className="h-10 rounded-lg border-secondary border w-full px-3 appearance-none focus:outline-none"
            >
              <option value={""}>None</option>
              {months.map((month) => {
                return (
                  <option value={month.id} key={month.id}>
                    {month.title}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-2 bottom-2 text-secondary" />
          </div>
          <div className="w-50 relative">
            <select
              value={filter.year}
              name="year"
              onChange={(e) => {
                setFilter((prev) => ({ ...prev, year: e.target.value }));
              }}
              className="h-10 rounded-lg border-secondary border w-full px-3 appearance-none focus:outline-none"
            >
              <option value={""}>None</option>
              {years.map((year, index) => {
                return (
                  <option value={year} key={index}>
                    {year}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-2 bottom-2 text-secondary" />
          </div>
        </div>
        <button
          title="Get Summary"
          onClick={() => fetchSummary(`${filter.month}-${filter.year}`)}
          disabled={!filter.month.trim() || !filter.year.trim()}
          className="rounded-full mt-2 bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600/80 capitalize cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          get summary
        </button>
      </div>
      {/* <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="total spent" amount={total_expenses ?? 0} />
        <StatCard title="total income" amount={total_income ?? 0} />
        <StatCard title="total kept" amount={total_kept ?? 0} />
      </div> */}
      {isFetchingSumm ? (
        <section className="h-20 flex items-center justify-center">
          <h1 className="text-center">Getting your summary...</h1>
        </section>
      ) : fetchSmErr ? (
        <section className="h-20 flex items-center justify-center">
          <h1 className="text-center">Failed to fetch summary.</h1>
        </section>
      ) : (
        <section className="space-y-7">
          {/* spending comparison */}
          <div className="rounded-2xl border border-secondary bg-white p-5 md:p-6">
            <h2 className="font-display text-lg font-semibold text-primary">
              {mySummary?.comparison?.title ?? ""}
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl text-primary bg-primary/10">
                <DollarSign />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Spending records between previous and the current month.
                </p>
                <p className="text-xs text-muted-foreground">
                  Last month: ₦{mySummary?.comparison.lastTotalSpending}.00 ·
                  This month: ₦{mySummary?.comparison.currTotalSpending}.00
                </p>
              </div>
            </div>
            <ul className="mt-5 divide-y divide-secondary border-t border-secondary">
              {mySummary?.comparison.breakdown.length === 0 ? (
                <div className="h-12 flex items-center justify-center text-center text-sm">
                  No records yet.
                </div>
              ) : (
                mySummary?.comparison.breakdown.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <p className="text-sm font-semibold text-primary">
                        {item.category}
                      </p>
                      <p className="text-sm text-muted-foreground tabular-nums">
                        ₦{item.lastMonthSpending.toLocaleString()}.00 →{" "}
                        <span className="font-semibold text-primary">
                          ₦{item.currMonthSpending.toLocaleString()}.00
                        </span>{" "}
                        <span className="text-red-700">(new)</span>
                      </p>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          {/* spendings by category */}
          <div className="rounded-2xl border border-secondary bg-white p-5 md:p-6">
            <h2 className="font-display text-lg font-semibold text-primary">
              Spending by category
            </h2>
            <ul className="mt-4 space-y-4">
              {mySummary?.byCategory.length === 0 ? (
                <div className="h-12 flex items-center justify-center text-center text-sm">
                  No records yet.
                </div>
              ) : (
                mySummary?.byCategory.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <p className="text-sm font-medium">
                          {item.category}{" "}
                          <span className="text-xs text-muted-foreground">
                            {item.percentageSpent}%
                          </span>
                        </p>
                        <p className="text-sm font-semibold tabular-nums text-primary">
                          ₦{item.totalSpent}.00
                        </p>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${item.percentageSpent}%` }}
                        ></div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
