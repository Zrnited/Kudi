import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { ApiError } from "../../lib/api";
import { register } from "../../api/users";
import { validatePassword } from "../../lib/validatePassword";

interface Props {
  action: "signup" | "login";
  setIsRequesting: React.Dispatch<React.SetStateAction<boolean>>;
  setAction: React.Dispatch<React.SetStateAction<"signup" | "login">>;
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

export default function Signup({ action, setIsRequesting, setAction }: Props) {
  const [form, setForm] = useState<Form>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);

    //password validation
    const { valid, errors } = validatePassword(form.password);
    if (!valid) {
      toast.error(`Password needs: ${errors.join(", ").toLowerCase()}`);
      return;
    }

    setIsLoading(true);
    setIsRequesting(true);
    register(form.fullName, form.email, form.password)
      .then(() => {
        toast.success("Registration successful");
        setForm(initialState);
        setAction("login");
      })
      .catch((e) => {
        const err = e as ApiError;
        toast.error(err.message);
        // console.log(err.message, err.errors?.amount);
      })
      .finally(() => (setIsLoading(false), setIsRequesting(false)));
  };

  useEffect(() => {
    if (action !== "signup") {
      setForm(initialState);
    }
  }, [action]);

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
          disabled={
            !form.fullName || !form.email || !form.password || isLoading
          }
          className="h-9.5 bg-primary text-white font-semibold rounded-lg w-full cursor-pointer mt-1 hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Registering..." : "Sign up"}
        </button>
        <p className="text-center text-xs text-foreground">
          Your account and ledger are secure by our servers
        </p>
      </form>
    </section>
  );
}
