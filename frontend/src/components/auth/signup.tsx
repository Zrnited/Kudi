import { useState } from "react";
import { toast } from "sonner";

interface Props {
  action: "signup" | "login";
}

interface Form {
  fullName: string;
  email: string;
  password: string;
}

const initialState: Form = {
  fullName: "",
  email: "",
  password: "",
};

export default function Signup({ action }: Props) {
  const [form, setForm] = useState<Form>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    toast.success("Login successful");
  };

  return (
    <section className={`mt-5 ${action === "signup" ? "" : "hidden"}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">full name *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none"
            type="text"
            placeholder="John Doe"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label className="capitalize">email *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none"
            type="email"
            placeholder="you@example.com"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1.5 text-sm">
          <label>Password (8 characters minimum) *</label>
          <input
            className="h-9.5 rounded-lg border px-3 focus:outline-none"
            type="password"
            placeholder="•••••••••••"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={!form.fullName || !form.email || !form.password}
          className="h-9.5 bg-primary text-white font-semibold rounded-lg w-full cursor-pointer mt-1 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Sign up
        </button>
        <p className="text-center text-xs text-foreground">
          Your account and ledger are secure by our servers
        </p>
      </form>
    </section>
  );
}
