interface StatProps {
  title: string;
  amount: number;
}

export default function StatCard({ title, amount }: StatProps) {
  return (
    <div className="rounded-2xl border border-secondary bg-white p-5">
      <p className="text-xs font-medium tracking-wide uppercase">{title}</p>
      <h1 className="mt-2 font-display text-2xl font-semibold tabular-nums text-foreground">
        ₦{amount.toLocaleString()}.00
      </h1>
    </div>
  );
}
