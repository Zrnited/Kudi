import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context";
import { logout } from "../../api/auth/signout";
import type { ApiError } from "../../lib/api";
import { toast } from "sonner";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, fetchingUser, setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signOut = async () => {
    setIsLoading(true);
    await logout()
      .then(() => (setUser(null), navigate("/auth", { replace: true })))
      .catch((e) => {
        const err = e as ApiError;
        toast.error(err.message);
      });
  };

  return (
    <header
      className={`flex p-3.5 border-b bg-white ${fetchingUser && "hidden"}`}
    >
      <nav className="flex items-center gap-x-5 justify-between w-full xl:px-20">
        <button className="flex items-center gap-x-2">
          <div className="h-10 w-10 rounded-md bg-primary text-white flex items-center justify-center text-xl">
            <h1>K</h1>
          </div>
          <div className="text-start text-sm">
            <Link className="w-fit" to={"/"}>
              <h2 className="capitalize text-lg w-fit font-semibold">kudi</h2>
            </Link>
            <p className="font-medium">{user?.name || "NA"}'s Ledger</p>
          </div>
        </button>
        <div className="flex gap-x-3 lg:gap-x-5">
          <button
            disabled={isLoading}
            onClick={signOut}
            className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-x-2 font-medium text-foreground transition-colors hover:bg-secondary capitalize cursor-pointer"
          >
            <LogOut size={15} />
            <p>{isLoading ? "signing out..." : "sign out"}</p>
          </button>
        </div>
      </nav>
    </header>
  );
}
