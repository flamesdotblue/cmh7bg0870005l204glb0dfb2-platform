import { useMemo, useState } from "react";
import Header from "./components/Header";
import BookingForm from "./components/BookingForm";
import RideOptions from "./components/RideOptions";
import MapPreview from "./components/MapPreview";

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function estimateDistanceKm(pickup, dropoff) {
  if (!pickup || !dropoff) return 0;
  const h = Math.abs(hashString(pickup) - hashString(dropoff));
  return Math.max(1, Math.min(50, (h % 30) + 3));
}

function App() {
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: 1,
    notes: "",
  });
  const [selectedRide, setSelectedRide] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const distanceKm = useMemo(
    () => estimateDistanceKm(form.pickup.trim(), form.dropoff.trim()),
    [form.pickup, form.dropoff]
  );

  const basePerKm = 1.2; // base fare per km in $ for economy
  const options = useMemo(
    () => [
      {
        id: "eco",
        name: "Economy",
        desc: "Affordable everyday rides",
        multiplier: 1,
        eta: "3-5 min",
        capacity: 4,
      },
      {
        id: "prem",
        name: "Premium",
        desc: "Comfortable sedans with top drivers",
        multiplier: 1.6,
        eta: "5-8 min",
        capacity: 4,
      },
      {
        id: "xl",
        name: "XL Van",
        desc: "Spacious rides for groups",
        multiplier: 2.1,
        eta: "8-12 min",
        capacity: 6,
      },
    ],
    []
  );

  const fares = useMemo(() => {
    const surge = distanceKm > 20 ? 1.15 : 1; // light surge for longer trips
    return options.map((opt) => {
      const est = Math.max(5, Math.round((distanceKm * basePerKm * opt.multiplier * surge + 2) * 100) / 100);
      return { ...opt, price: est };
    });
  }, [distanceKm, options]);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSubmitted(false);
  }

  function handleSubmit(e) {
    e?.preventDefault?.();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
          <section className="md:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <BookingForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                distanceKm={distanceKm}
              />
            </div>

            <div className="mt-6">
              <MapPreview pickup={form.pickup} dropoff={form.dropoff} distanceKm={distanceKm} />
            </div>
          </section>

          <aside className="md:col-span-2">
            <div className="sticky top-4 space-y-4">
              <RideOptions
                options={fares}
                selectedId={selectedRide?.id || null}
                onSelect={(opt) => setSelectedRide(opt)}
                distanceKm={distanceKm}
                submitted={submitted}
              />

              {submitted && selectedRide ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <h3 className="mb-1 font-semibold text-emerald-900">Ride confirmed</h3>
                  <p className="text-sm text-emerald-800">
                    {selectedRide.name} arriving in {selectedRide.eta}. Estimated fare ${selectedRide.price.toFixed(2)} for ~{distanceKm} km.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="mb-1 font-semibold text-slate-900">How pricing works</h3>
                  <p className="text-sm text-slate-600">
                    Fares are estimates based on distance, ride type, and demand. Taxes and fees may apply.
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
