import { StatCard } from "@/components/shared/StatCard";
import { DollarSign, Truck, TrendingUp } from "lucide-react";

const history = [
  { id: "1", label: "Antar #WU-1233", amount: 8000, date: "23 Feb 2026" },
  { id: "2", label: "Jemput #WU-1234", amount: 6000, date: "23 Feb 2026" },
  { id: "3", label: "Antar #WU-1230", amount: 8000, date: "22 Feb 2026" },
  { id: "4", label: "Bonus Mingguan", amount: 25000, date: "21 Feb 2026" },
];

export default function CourierEarnings() {
  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-lg font-bold">Penghasilan</h2>

      <div className="grid gap-3">
        <StatCard title="Total Bulan Ini" value="Rp 1.250.000" icon={DollarSign} gradient="primary" />
        <div className="grid grid-cols-2 gap-3">
          <StatCard title="Tugas Selesai" value="47" icon={Truck} gradient="accent" />
          <StatCard title="Rating" value="4.8" icon={TrendingUp} gradient="warm" subtitle="⭐" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Riwayat</h3>
        <div className="space-y-2">
          {history.map((h) => (
            <div key={h.id} className="flex items-center justify-between rounded-xl border bg-card p-3.5 shadow-soft">
              <div>
                <p className="text-sm font-medium">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.date}</p>
              </div>
              <span className="text-sm font-bold text-success">+Rp {h.amount.toLocaleString("id-ID")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
