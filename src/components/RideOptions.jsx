import { Car, CreditCard } from "lucide-react";

export default function RideOptions({ options, selectedId, onSelect, distanceKm, submitted }) {
  const disabled = distanceKm === 0;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Select a ride</h3>
        <span className="text-xs text-slate-500">{distanceKm ? `~${distanceKm} km` : "No route yet"}</span>
      </div>

      <div className="space-y-3">
        {options.map((opt) => {
          const active = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              disabled={disabled}
              onClick={() => onSelect(opt)}
              className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                active ? "border-emerald-600 ring-2 ring-emerald-200" : "border-slate-200 hover:border-slate-300"
              } ${disabled ? "cursor-not-allowed opacity-50" : "bg-white"}`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${active ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                  <Car size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{opt.name}</p>
                    <p className="font-semibold">${opt.price.toFixed(2)}</p>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between text-xs text-slate-500">
                    <p>{opt.desc}</p>
                    <p>{opt.eta}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <CreditCard size={14} />
          <span>Pay in app with your saved card</span>
        </div>
        <span className="font-medium text-slate-700">Secure</span>
      </div>

      <button
        className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!selectedId || disabled}
        onClick={(e) => {
          e.preventDefault();
          if (!disabled && selectedId) {
            // parent handles confirmation UI
          }
        }}
      >
        {submitted ? "Booked" : selectedId ? "Confirm ride" : "Choose a ride"}
      </button>
    </div>
  );
}
