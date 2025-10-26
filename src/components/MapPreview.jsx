import { MapPin, Navigation } from "lucide-react";

export default function MapPreview({ pickup, dropoff, distanceKm }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-sky-50 to-white p-5">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <GridPattern />
      </div>

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
            <Navigation size={16} />
          </div>
          <div>
            <p className="font-semibold leading-tight">Route preview</p>
            <p className="text-xs text-slate-600">Not an actual map • For illustration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="relative h-52 w-full overflow-hidden rounded-xl border border-emerald-200/60 bg-white">
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-emerald-300"></div>
              <div className="absolute inset-6 rounded-lg bg-gradient-to-br from-emerald-100/30 to-sky-100/30"></div>
              {/* Pins */}
              {pickup ? (
                <Badge className="absolute left-6 top-6 border-emerald-300 bg-emerald-600 text-white">
                  <MapPin size={14} className="-ml-0.5" />
                  <span className="truncate">{pickup}</span>
                </Badge>
              ) : null}
              {dropoff ? (
                <Badge className="absolute bottom-6 right-6 border-red-300 bg-red-600 text-white">
                  <MapPin size={14} className="-ml-0.5" />
                  <span className="truncate">{dropoff}</span>
                </Badge>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3 text-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Distance</span>
                <span className="font-medium">{distanceKm ? `~${distanceKm} km` : "—"}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-slate-500">Traffic</span>
                <span className="font-medium">{distanceKm ? (distanceKm > 20 ? "Moderate" : "Light") : "Unknown"}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-slate-500">Route</span>
                <span className="font-medium">{pickup && dropoff ? "Direct" : "Awaiting"}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">Tip: Prices may vary with demand. Booking earlier can help secure better fares.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridPattern() {
  const grid = [];
  for (let i = 0; i < 40; i++) grid.push(i);
  return (
    <div className="h-full w-full">
      {grid.map((i) => (
        <div key={i} className="absolute left-0 right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" style={{ transform: `translateY(${i * 14}px)` }} />
      ))}
      {grid.map((i) => (
        <div key={`c-${i}`} className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-transparent via-slate-300/30 to-transparent" style={{ left: `${i * 14}px` }} />
      ))}
    </div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <div className={`flex max-w-[65%] items-center gap-1 truncate rounded-md px-2 py-1 text-xs shadow-sm ${className}`}>{children}</div>
  );
}
