import { Car, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Car size={18} />
          </div>
          <div>
            <p className="font-semibold leading-tight">SwiftCab</p>
            <p className="text-xs text-slate-500 -mt-0.5">Ride in minutes</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 md:block">
            Help
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
            <User size={16} /> Account
          </button>
        </div>
      </div>
    </header>
  );
}
