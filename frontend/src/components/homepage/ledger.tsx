type MockInterview = {
  title: string;
  date: string;
  type: "income" | "expense";
  amount: number;
  useHr: boolean;
};

export default function Ledger() {
  const mockLedger: MockInterview[] = [
    {
      title: "salary",
      date: "1 Oct",
      amount: 450000,
      type: "income",
      useHr: true,
    },
    {
      title: "food",
      date: "3 Oct",
      amount: 8500,
      type: "expense",
      useHr: true,
    },
    {
      title: "transport",
      date: "5 Oct",
      amount: 2300,
      type: "expense",
      useHr: true,
    },
    {
      title: "freelance",
      date: "9 Oct",
      amount: 60000,
      type: "income",
      useHr: false,
    },
  ];

  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <p className="font-display text-sm font-semibold">October ledger</p>
        <p className="text-sm font-semibold tabular-nums text-green-800">
          ₦382,400 left
        </p>
      </div>
      <ul className="divide-y divide-gray-500">
        {mockLedger.map((record, index) => {
          return (
            <li key={index} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium capitalize">{record.title}</p>
                <p className="text-xs text-foreground">{record.date}</p>
              </div>
              <p
                className={`text-sm font-semibold tabular-nums ${record.type === "income" ? "text-primary" : "text-red-700"}`}
              >
                ₦{record.amount.toLocaleString()}.00
              </p>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 rounded-xl bg-secondary p-3">
        <p className="text-xs font-medium flex items-center gap-x-2">
          <span>Budget · Food</span>
          <span className="text-muted-foreground">₦41,500 of ₦50,000 used</span>
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-500/10">
          <div className="h-full w-[83%] rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
}
