import { useState } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { ShoppingBag, Clock } from "lucide-react";

const orders = [
  { id: "WU-1234", service: "Cuci Reguler", weight: "3.5 kg", total: "Rp 24.500", status: "washing" as const, date: "23 Feb 2026" },
  { id: "WU-1233", service: "Dry Clean", weight: "2 pcs", total: "Rp 50.000", status: "ready" as const, date: "22 Feb 2026" },
  { id: "WU-1230", service: "Cuci Reguler", weight: "5 kg", total: "Rp 35.000", status: "completed" as const, date: "20 Feb 2026" },
  { id: "WU-1225", service: "Setrika", weight: "4 kg", total: "Rp 20.000", status: "completed" as const, date: "18 Feb 2026" },
];

export default function CustomerOrders() {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? orders : orders.filter((o) => (tab === "active" ? !["completed", "cancelled"].includes(o.status) : ["completed", "cancelled"].includes(o.status)));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Pesanan Saya</h2>
        <Link to="/customer/order/create"><Button size="sm" className="gradient-primary text-xs">+ Buat Pesanan</Button></Link>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="active">Aktif</TabsTrigger>
          <TabsTrigger value="done">Selesai</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="Belum ada pesanan" description="Pesanan kamu akan muncul di sini" />
      ) : (
        <div className="space-y-2">
          {filtered.map((o) => (
            <Link to={`/customer/orders/${o.id}`} key={o.id} className="block rounded-xl border bg-card p-4 shadow-soft hover:shadow-card transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2"><Clock className="h-4 w-4 text-primary" /></div>
                  <div>
                    <p className="text-sm font-semibold">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.service} · {o.weight}</p>
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{o.date}</span>
                <span className="font-semibold text-foreground">{o.total}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
