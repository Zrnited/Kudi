import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex p-5">
      <nav className="flex items-center gap-x-5 justify-between w-full pt-2 xl:px-20">
        <button className="flex items-center gap-x-2">
          <div className="h-10 w-10 rounded-md bg-primary text-white flex items-center justify-center text-xl">
            <h1>K</h1>
          </div>
          <h2 className="capitalize text-lg font-semibold">kudi</h2>
        </button>
        <div className="flex gap-x-3 lg:gap-x-5">
          <Link to={'/auth'} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary capitalize cursor-pointer">
            sign in
          </Link>
          <Link to={'/auth'} className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 capitalize cursor-pointer">
            get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
