import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";

export default function AuthPage() {
  const [action, setAction] = useState<"login" | "signup">("login");
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link className="mb-8 flex items-center justify-center gap-2" to="/">
          <h1 className="flex size-9 items-center justify-center rounded-lg bg-primary font-display text-xl font-bold text-white">
            K
          </h1>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Kudi
          </h1>
        </Link>
        <div className="w-full bg-secondary p-1 rounded-xl h-10 gap-x-2 flex items-center text-sm">
          <button
            onClick={() => setAction("login")}
            className={`w-1/2 h-full rounded-xl cursor-pointer transition ease-in-out delay-100 ${action === "login" ? "bg-white font-semibold" : "bg-none"}`}
          >
            Sign in
          </button>
          <button
            onClick={() => setAction("signup")}
            className={`w-1/2 h-full rounded-xl cursor-pointer transition ease-in-out delay-100 ${action === "signup" ? "bg-white font-semibold" : "bg-none"}`}
          >
            Create account
          </button>
        </div>
        <Login action={action} />
        <Signup action={action} />
      </div>
    </main>
  );
}
