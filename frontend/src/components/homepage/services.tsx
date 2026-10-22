import { DollarSign, type LucideIcon } from "lucide-react";

type Service = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

export default function Services() {
  const services: Service[] = [
    {
      Icon: DollarSign,
      title: "Every naira, logged",
      description:
        "Add income and expenses with an amount, category, date and note in a few taps.",
    },
    {
      Icon: DollarSign,
      title: "Months, side by side",
      description:
        "See your total spend, spending per category, and how you stack up against last month.",
    },
    {
      Icon: DollarSign,
      title: "Budget that tap your shoulder",
      description:
        "Set a budget per category and get flagged the moment you drift over the line.",
    },
  ];
  return (
    <section className="grid gap-4 md:grid-cols-3 mx-auto px-6 xl:px-20">
      {services.map((service, index) => {
        return (
          <div key={index} className="rounded-2xl border bg-white p-6">
            <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-yellow-700 text-white">
              <service.Icon size={20} />
            </div>
            <h2 className="font-display text-lg font-semibold text-primary">
              {service.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
