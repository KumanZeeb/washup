import { useState } from "react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Order {
  id: string; customer: string; service: string; weight: string; total: string; status: string; date: string;
  [key: string]: unknown;
}

const orders: Order[] = [
  { id: "WU-1234", customer: "Budi Santoso", service: "Cuci Reguler", weight: "3.5 kg", total: "Rp 24.500", status: "washing", date: "23 Feb 2026" },
  { id: "WU-1233", customer: "Siti Rahayu", service: "Dry Clean", weight: "2 pcs", total: "Rp 50.000", status: "ready", date: "22 Feb 2026" },
  { id: "WU-1232", customer: "Andi Wijaya", service: "Setrika", weight: "4 kg", total: "Rp 20.000", status: "pending", date: "22 Feb 2026" },
  { id: "WU-1231", customer: "Dewi Lestari", service: "Cuci Selimut", weight: "1 pcs", total: "Rp 30.000", status: "delivered", date: "21 Feb 2026" },
  { id: "WU-1230", customer: "Budi Santoso", service: "Cuci Reguler", weight: "5 kg", total: "Rp 35.000", status: "completed", date: "20 Feb 2026" },
];

const columns: Column<Order>[] = [
  { key: "id", header: "ID" },
  { key: "customer", header: "Pelanggan" },
  { key: "service", header: "Layanan" },
  { key: "weight", header: "Berat" },
  { key: "total", header: "Total" },
  { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  { key: "date", header: "Tanggal" },
  {
    key: "actions", header: "", render: (row) => (
      <Select onValueChange={(val) => toast({ title: `Status ${row.id} → ${val}` })}>
        <SelectTrigger className="h-7 w-28 text-xs"><SelectValue placeholder="Update" /></SelectTrigger>
        <SelectContent>
          {["pending", "processing", "washing", "drying", "ready", "delivered", "completed"].map((s) => (
            <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
];

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Pesanan</h1>
        <Button variant="outline" size="sm" onClick={() => toast({ title: "Export CSV..." })}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            {["pending", "processing", "washing", "ready", "delivered", "completed"].map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filtered} searchable searchKeys={["id", "customer", "service"]} emptyTitle="Tidak ada pesanan" />
    </div>
  );
}
