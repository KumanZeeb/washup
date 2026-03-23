import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Shirt, Wind, Sparkles, Bed, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";

const services = [
  { icon: Shirt, label: "Cuci Reguler", price: "Rp 7.000/kg", color: "text-primary" },
  { icon: Sparkles, label: "Dry Clean", price: "Rp 25.000/pcs", color: "text-accent" },
  { icon: Wind, label: "Setrika", price: "Rp 5.000/kg", color: "text-warning" },
  { icon: Bed, label: "Cuci Selimut", price: "Rp 30.000/pcs", color: "text-info" },
];

const recentOrders = [
  { id: "WU-1234", service: "Cuci Reguler", status: "washing" as const, date: "23 Feb 2026" },
  { id: "WU-1230", service: "Dry Clean", status: "completed" as const, date: "20 Feb 2026" },
];

export default function CustomerHome() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="gradient-primary rounded-2xl p-5 text-primary-foreground">
        <p className="text-sm opacity-90">Selamat datang kembali,</p>
        <h2 className="text-xl font-bold">{user?.name || "Pelanggan"} 👋</h2>
        <div className="mt-3 flex gap-4 text-sm">
          <div>
            <p className="opacity-80 text-xs">Saldo</p>
            <p className="font-bold">Rp 150.000</p>
          </div>
          <div>
            <p className="opacity-80 text-xs">Poin</p>
            <p className="font-bold">320</p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Layanan</h3>
          <Link to="/customer/services" className="text-xs text-primary font-medium">Lihat Semua</Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {services.map((s) => (
            <Link to="/customer/order/create" key={s.label} className="flex flex-col items-center gap-1.5 rounded-xl border bg-card p-3 shadow-soft hover:shadow-card transition-shadow text-center">
              <div className={`rounded-lg bg-muted p-2 ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium leading-tight">{s.label}</span>
              <span className="text-[9px] text-muted-foreground">{s.price}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick action */}
      <Link to="/customer/order/create">
        <Button className="w-full gradient-primary h-12 text-base font-semibold shadow-card">
          + Buat Pesanan Baru
        </Button>
      </Link>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Pesanan Terbaru</h3>
          <Link to="/customer/orders" className="text-xs text-primary font-medium flex items-center gap-1">
            Semua <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {recentOrders.map((o) => (
            <Link to={`/customer/orders/${o.id}`} key={o.id} className="flex items-center justify-between rounded-xl border bg-card p-3.5 shadow-soft hover:shadow-card transition-shadow">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.service} · {o.date}</p>
                </div>
              </div>
              <StatusBadge status={o.status} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
