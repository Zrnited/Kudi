import { ArrowUpRight, ChevronDown } from "lucide-react";
import StatCard from "./stat-card";

export default function Summary() {
  return (
    <div className="space-y-7 mt-4">
      <div className="flex items-center gap-x-3 text-sm">
        <div className="w-50 relative">
          <select className="h-10 rounded-lg border-secondary border w-full px-3 appearance-none focus:outline-none">
            <option>August 2026</option>
            <option>September 2026</option>
            <option>October 2026</option>
          </select>
          <ChevronDown className="absolute right-2 bottom-2 text-secondary" />
        </div>
        <p className="capitalize">monthly summary</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="total spent" amount={1200} />
        <StatCard title="total income" amount={3000} />
        <StatCard title="kept" amount={1800} />
      </div>
      {/* spending comparison */}
      <div className="rounded-2xl border border-secondary bg-white p-5 md:p-6">
        <h2 className="font-display text-lg font-semibold text-primary">
          Compared to September 2026
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl text-red-700 bg-red-700/10">
            <ArrowUpRight />
          </div>
          <div>
            <p className="text-sm font-semibold">
              No spending recorded last month
            </p>
            <p className="text-xs text-muted-foreground">
              Last month: ₦0.00 · This month: ₦4,200.00
            </p>
          </div>
        </div>
        <ul className="mt-5 divide-y divide-secondary border-t border-secondary">
          <li className="flex items-center justify-between gap-3 py-2.5">
            <p className="text-sm font-semibold text-primary">Transport</p>
            <p className="text-sm text-muted-foreground tabular-nums">
              ₦0.00 →{" "}
              <span className="font-semibold text-primary">₦3,000.00</span>{" "}
              <span className="text-red-700">(new)</span>
            </p>
          </li>
          <li className="flex items-center justify-between gap-3 py-2.5">
            <p className="text-sm font-semibold text-primary">Food</p>
            <p className="text-sm text-muted-foreground tabular-nums">
              ₦0.00 →{" "}
              <span className="font-semibold text-primary">₦3,000.00</span>{" "}
              <span className="text-red-700">(new)</span>
            </p>
          </li>
        </ul>
      </div>
      {/* spendings by category */}
      <div className="rounded-2xl border border-secondary bg-white p-5 md:p-6">
        <h2 className="font-display text-lg font-semibold text-primary">
          Spending by category
        </h2>
        <ul className="mt-4 space-y-4">
          <li>
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-sm font-medium">
                Food <span className="text-xs text-muted-foreground">52%</span>
              </p>
              <p className="text-sm font-semibold tabular-nums text-primary">
                ₦3,200.00
              </p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: "51.6129%" }}
              ></div>
            </div>
          </li>
          <li>
            <div className="mb-1.5 flex items-baseline justify-between">
              <p className="text-sm font-medium">
                Transport <span className="text-xs text-muted-foreground">48%</span>
              </p>
              <p className="text-sm font-semibold tabular-nums text-primary">
                ₦1,200.00
              </p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: "48%" }}
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
