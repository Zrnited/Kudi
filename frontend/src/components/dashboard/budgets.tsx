import { expenses } from "../../constants";

type BudgetItem = {
  title: string;
  amountBudgeted: number | string;
  status: "on-track" | "over";
  amountUsed: number;
  amountRemaining: number;
  percentageUsed: string;
};

interface Budget {
  title: string;
  fromDate: string;
  toDate: string;
  budget: BudgetItem[];
  createdAt: string;
}

const mockBudget: Budget = {
  title: "Budget for October",
  fromDate: "2026-10-01",
  toDate: "2026-10-31",
  budget: [
    {
      title: "food",
      amountBudgeted: 2000,
      status: "on-track",
      amountUsed: 3200,
      amountRemaining: 16800,
      percentageUsed: "16%",
    },
  ],
  createdAt: "22 Oct 2026",
};

export default function Budgets() {
  return (
    <div className="space-y-7 mt-4">
      {/* create a budget form */}
      <form
        // onSubmit={handleSubmit}
        className="rounded-2xl border border-secondary bg-white p-5 md:p-6 space-y-5"
      >
        {/* heading */}
        <div className="space-y-1">
          <h2 className="font-display text-lg font-semibold text-primary">
            Create a Budget
          </h2>
          <p className="text-sm text-muted-foreground">
            Set a monthly limit for a category of your choice. You'll be flagged
            the moment spending crosses the line. You can only have one budget
            at a time.
          </p>
        </div>
        {/* title */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label>budget title *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="text"
            placeholder="Budget for October 2026"
            name="note"
            // value={form.note}
            // onChange={handleChange}
          />
        </div>
        {/* start date */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">start period *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="date"
            //   min={new Date().toISOString().split("T")[0]}
            //   max={new Date().toISOString().split("T")[0]}
            placeholder="Select Start Date"
            name="date"
            // value={form.date}
            // onChange={handleChange}
          />
        </div>
        {/* end date */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">end period *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="date"
            //   min={new Date().toISOString().split("T")[0]}
            //   max={new Date().toISOString().split("T")[0]}
            placeholder="Select Start Date"
            name="date"
            // value={form.date}
            // onChange={handleChange}
          />
        </div>
        {/* amount */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">amount *</label>
          <input
            className="h-9.5 rounded-lg border border-secondary px-3 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            placeholder="0.00"
            name="amount"
            // value={form.amount}
            // onChange={handleChange}
          />
        </div>
        {/* category */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">category *</label>
          <select className="appearance-none border-secondary capitalize h-9.5 rounded-lg border px-3 focus:outline-none">
            {expenses.map((utility, index) => {
              return (
                <option key={index} value={utility}>
                  {utility}
                </option>
              );
            })}
          </select>
        </div>
        {/* submit btn */}
        <button
          // disabled={!form.amount || !form.category || !form.date}
          className="h-9.5 bg-primary text-white font-medium rounded-lg w-full cursor-pointer mt-1 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Create budget
        </button>
      </form>
      {/* overview */}
      <div className="rounded-2xl border border-secondary bg-white p-5 md:p-6">
        <h2 className="font-display text-lg font-semibold text-primary">
          Budgets · October 2026
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set a monthly limit for a category of your choice. You'll be flagged
          the moment spending crosses the line.
        </p>
        <div className="mt-4 flex items-baseline justify-between rounded-xl bg-secondary px-4 py-3">
          <p className="text-sm font-medium text-primary">
            Total budgeted: ₦20,000.00
          </p>
          <p className="text-sm font-semibold tabular-nums text-green-700">
            ₦3,200.00 spent
          </p>
        </div>
      </div>
      {/* budgets */}
      <div className="rounded-2xl border border-secondary bg-white">
        <h2 className="font-display text-lg font-semibold text-primary pt-5 px-5">
          Budget for October
        </h2>
        <ul className="divide-y divide-secondary">
          <li className="px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold">Food</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">₦{(2000).toLocaleString()}.00</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: "48%" }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground tabular-nums">
                  ₦3,200.00 of ₦20,000.00 (16%)
                </span>
                <span className="rounded-full bg-green-700/10 px-2 py-0.5 font-semibold text-green-700">
                  On track
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
