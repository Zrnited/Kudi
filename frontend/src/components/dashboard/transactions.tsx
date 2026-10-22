import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { expenses, income } from "../../constants";

type Category =
  | "food"
  | "transport"
  | "housing"
  | "utilities"
  | "shopping"
  | "entertainment"
  | "health"
  | "education"
  | "other"
  | "salary"
  | "freelance"
  | "business"
  | "gifts"
  | "others";

interface RecordForm {
  amount: number | string;
  category: Category;
  date: string;
  note: string;
}

interface RecordHistory extends RecordForm {
  type: "expense" | "income";
}

const initialData: RecordForm = {
  amount: 0,
  category: "food",
  date: "",
  note: "",
};

const mockHistory: RecordHistory[] = [
  {
    category: "freelance",
    note: "We outside",
    type: "income",
    amount: 3000,
    date: "2026-10-21",
  },
  {
    category: "food",
    note: "Lunch with Tunde",
    type: "expense",
    amount: 1200,
    date: "2026-10-21",
  },
];

export default function Transactions() {
  const [action, setAction] = useState<"expense" | "income">("expense");
  const [form, setForm] = useState<RecordForm>(initialData);

  const category: string[] = action === "expense" ? expenses : income;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    toast.success("form submitted successfully");
    setForm(initialData);
  };

  return (
    <div className="space-y-7">
      {/* income/expense form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-secondary bg-white p-5 md:p-6 space-y-5"
      >
        {/* navigator */}
        <div className="w-full bg-secondary p-1 rounded-xl h-10 gap-x-2 flex items-center text-sm">
          {/* navbar */}
          <div
            onClick={() => setAction("expense")}
            className={`w-1/2 h-full rounded-xl cursor-pointer transition flex items-center justify-center ease-in-out delay-100 ${action === "expense" ? "bg-white font-medium text-red-800" : "bg-none"}`}
          >
            Expense
          </div>
          <div
            onClick={() => setAction("income")}
            className={`w-1/2 h-full rounded-xl cursor-pointer flex items-center justify-center transition ease-in-out delay-100 ${action === "income" ? "bg-white font-medium text-primary" : "bg-none"}`}
          >
            Income
          </div>
        </div>
        {/* amount */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">amount *</label>
          <input
            className="h-9.5 rounded-lg border border-secondary px-3 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            placeholder="0.00"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        {/* category */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">category *</label>
          <select className="appearance-none border-secondary capitalize h-9.5 rounded-lg border px-3 focus:outline-none">
            {category.map((utility, index) => {
              return (
                <option key={index} value={utility}>
                  {utility}
                </option>
              );
            })}
          </select>
        </div>
        {/* date */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">date *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="date"
            //   min={new Date().toISOString().split("T")[0]}
            //   max={new Date().toISOString().split("T")[0]}
            placeholder="Select Date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        {/* note */}
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label>Note (optional)</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none border-secondary"
            type="text"
            placeholder={`${action === "expense" ? "Lunch with Tunde" : "October Salary"}`}
            name="note"
            value={form.note}
            onChange={handleChange}
          />
        </div>
        {/* submit btn */}
        <button
          disabled={!form.amount || !form.category || !form.date}
          className="h-9.5 bg-primary text-white font-medium rounded-lg w-full cursor-pointer mt-1 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          + Add {action === "expense" ? "Expense" : "Income"}
        </button>
      </form>
      {/* history */}
      <div className="rounded-2xl border border-secondary bg-white p-5 md:p-6 space-y-5">
        <div
          className="flex justify-between items-center border-b border-secondary pb-3"
          data-qb-rot-theme="green"
        >
          <h2 className="font-display text-lg font-semibold text-primary">
            History
          </h2>
          <p className="text-sm text-muted-foreground">{mockHistory.length} entries</p>
        </div>
        <ul className="divide-y divide-secondary divide-border space-y-5">
          {mockHistory.map((history, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between gap-3 pb-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground capitalize">
                    {history.category}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {history.note}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(history.date, "dd MMM yyyy")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <p className={`text-sm font-semibold tabular-nums text-expense ${history.type === "income" ? "text-primary" : "text-red-700"}`}>
                    {history.type === "expense" ? "-" : "+"}₦{history.amount.toLocaleString()}
                  </p>
                  <button
                    title="Delete"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 w-9 hover:bg-yellow-700 hover:text-white transition ease-in-out delay-100"
                    // aria-label="Delete Food on 2026-10-21"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
