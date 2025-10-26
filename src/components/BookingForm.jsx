import { MapPin, Clock, User as UserIcon, Calendar } from "lucide-react";

export default function BookingForm({ form, onChange, onSubmit, distanceKm }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Book a ride</h2>
        {distanceKm > 0 ? (
          <span className="text-xs text-slate-500">~{distanceKm} km</span>
        ) : (
          <span className="text-xs text-slate-400">Enter pickup and dropoff</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field label="Pickup" icon={<MapPin className="text-emerald-600" size={16} />}>
          <input
            type="text"
            value={form.pickup}
            onChange={(e) => onChange("pickup", e.target.value)}
            placeholder="Where from?"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 placeholder:text-slate-400 focus:ring-2"
            required
          />
        </Field>
        <Field label="Dropoff" icon={<MapPin className="text-red-600" size={16} />}>
          <input
            type="text"
            value={form.dropoff}
            onChange={(e) => onChange("dropoff", e.target.value)}
            placeholder="Where to?"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 placeholder:text-slate-400 focus:ring-2"
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Field label="Date" icon={<Calendar size={16} /> }>
          <input
            type="date"
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            required
          />
        </Field>
        <Field label="Time" icon={<Clock size={16} /> }>
          <input
            type="time"
            value={form.time}
            onChange={(e) => onChange("time", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
            required
          />
        </Field>
        <Field label="Passengers" icon={<UserIcon size={16} /> }>
          <input
            type="number"
            min={1}
            max={6}
            value={form.passengers}
            onChange={(e) => onChange("passengers", Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2"
          />
        </Field>
        <Field label="Notes">
          <input
            type="text"
            value={form.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Gate code, luggage, etc."
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 placeholder:text-slate-400 focus:ring-2"
          />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            onChange("pickup", "");
            onChange("dropoff", "");
          }}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear
        </button>
        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!form.pickup || !form.dropoff || !form.date || !form.time}
        >
          See rides
        </button>
      </div>
    </form>
  );
}

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-600">
        {icon ? <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-slate-700">{icon}</span> : null}
        {label}
      </span>
      {children}
    </label>
  );
}
