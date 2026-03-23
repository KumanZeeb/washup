import { ShoppingBag, DollarSign, Users, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12400000 },
  { month: "Feb", revenue: 15800000 },
  { month: "Mar", revenue: 14200000 },
  { month: "Apr", revenue: 18500000 },
  { month: "Mei", revenue: 16700000 },
  { month: "Jun", revenue: 21300000 },
];

const orderData = [
  { day: "Sen", orders: 42 },
  { day: "Sel", orders: 38 },
  { day: "Rab", orders: 55 },
  { day: "Kam", orders: 47 },
  { day: "Jum", orders: 61 },
  { day: "Sab", orders: 78 },
  { day: "Min", orders: 65 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Ringkasan performa bisnis Anda</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Pesanan" value="1,247" icon={ShoppingBag} gradient="primary" trend={{ value: 12, label: "dari bulan lalu" }} />
        <StatCard title="Pendapatan" value="Rp 21,3 Jt" icon={DollarSign} gradient="accent" trend={{ value: 8, label: "dari bulan lalu" }} />
        <StatCard title="Pelanggan Aktif" value="384" icon={Users} gradient="warm" trend={{ value: 5, label: "dari bulan lalu" }} />
        <StatCard title="Rata-rata Harian" value="65" subtitle="pesanan / hari" icon={TrendingUp} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold mb-4">Pendapatan Bulanan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000000}Jt`} />
              <Tooltip formatter={(v: number) => `Rp ${v.toLocaleString("id-ID")}`} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold mb-4">Pesanan Mingguan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--accent))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
