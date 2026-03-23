import { useState } from "react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { MapPin, Clock, Check, X, ClipboardList } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Task { id: string; type: "pickup" | "delivery"; customer: string; address: string; time: string; status: string; orderId: string; }

const tasks: Task[] = [
  { id: "T1", type: "pickup", customer: "Budi Santoso", address: "Jl. Merdeka No. 10", time: "10:00", status: "pending", orderId: "WU-1234" },
  { id: "T2", type: "delivery", customer: "Siti Rahayu", address: "Jl. Sudirman No. 5", time: "14:00", status: "pending", orderId: "WU-1233" },
  { id: "T3", type: "pickup", customer: "Andi Wijaya", address: "Jl. Gatot Subroto 22", time: "11:00", status: "picked_up", orderId: "WU-1232" },
];

export default function CourierTasks() {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all" ? tasks : tasks.filter((t) => t.type === tab);

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold">Tugas Saya</h2>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pickup">Jemput</TabsTrigger>
          <TabsTrigger value="delivery">Antar</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Tidak ada tugas" description="Tugas baru akan muncul di sini" />
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => (
            <div key={t.id} className="rounded-xl border bg-card p-4 shadow-soft space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.type === "pickup" ? "bg-info/15 text-info" : "bg-success/15 text-success"}`}>
                      {t.type === "pickup" ? "JEMPUT" : "ANTAR"}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.orderId}</span>
                  </div>
                  <p className="font-semibold text-sm mt-1">{t.customer}</p>
                </div>
                <StatusBadge status={t.status} />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {t.address}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {t.time}
              </div>

              {t.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gradient-primary text-xs" onClick={() => toast({ title: "Tugas diterima!" })}>
                    <Check className="mr-1 h-3 w-3" /> Terima
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs text-destructive" onClick={() => toast({ title: "Tugas ditolak" })}>
                    <X className="mr-1 h-3 w-3" /> Tolak
                  </Button>
                </div>
              )}
              {t.status !== "pending" && (
                <Link to={`/courier/task/${t.id}`}>
                  <Button size="sm" variant="outline" className="w-full text-xs">Detail & Update</Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
