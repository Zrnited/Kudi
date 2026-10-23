import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="flex p-3.5 border-b bg-white">
      <nav className="flex items-center gap-x-5 justify-between w-full xl:px-20">
        <button className="flex items-center gap-x-2">
          <div className="h-10 w-10 rounded-md bg-primary text-white flex items-center justify-center text-xl">
            <h1>K</h1>
          </div>
          <div className="text-start text-sm">
            <h2 className="capitalize text-lg font-semibold">kudi</h2>
            <p className="font-medium">Ada Obi's Ledger</p>
          </div>
        </button>
        <div className="flex gap-x-3 lg:gap-x-5">
          <button
            disabled={false}
            onClick={() => navigate("/", { replace: true })}
            className="rounded-full border border-border px-4 py-2 text-sm flex items-center gap-x-2 font-medium text-foreground transition-colors hover:bg-secondary capitalize cursor-pointer"
          >
            <LogOut size={15} />
            <p>sign out</p>
          </button>
        </div>
      </nav>
    </header>
  );
}
