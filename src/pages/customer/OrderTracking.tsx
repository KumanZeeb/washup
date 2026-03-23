import { useParams, Link } from "react-router-dom";
import { Timeline, type TimelineStep } from "@/components/shared/Timeline";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";

const steps: TimelineStep[] = [
  { label: "Pesanan Dibuat", description: "Order diterima sistem", time: "23 Feb, 09:00", status: "completed" },
  { label: "Dijemput", description: "Kurir menjemput pakaian", time: "23 Feb, 10:30", status: "completed" },
  { label: "Dicuci", description: "Sedang dalam proses pencucian", time: "23 Feb, 11:00", status: "current" },
  { label: "Siap Antar", status: "upcoming" },
  { label: "Diantar", status: "upcoming" },
  { label: "Selesai", status: "upcoming" },
];

export default function OrderTracking() {
  const { id } = useParams();

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/customer/orders"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        <div>
          <h2 className="text-lg font-bold">Pesanan {id}</h2>
          <p className="text-xs text-muted-foreground">Cuci Reguler · 3.5 kg</p>
        </div>
        <div className="ml-auto"><StatusBadge status="washing" /></div>
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold mb-4">Status Pesanan</h3>
        <Timeline steps={steps} />
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-soft space-y-2">
        <h3 className="text-sm font-semibold">Detail Pesanan</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-muted-foreground">Layanan</span><p className="font-medium">Cuci Reguler</p></div>
          <div><span className="text-muted-foreground">Berat</span><p className="font-medium">3.5 kg</p></div>
          <div><span className="text-muted-foreground">Total</span><p className="font-medium">Rp 24.500</p></div>
          <div><span className="text-muted-foreground">Pembayaran</span><p className="font-medium">Wallet</p></div>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        <Star className="mr-2 h-4 w-4" /> Beri Ulasan
      </Button>
    </div>
  );
}
