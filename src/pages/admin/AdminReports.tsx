import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminReports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Laporan Keuangan</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Exporting PDF..." })}>
            <FileText className="mr-1 h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Exporting CSV..." })}>
            <Download className="mr-1 h-4 w-4" /> CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Pendapatan" value="Rp 98.9 Jt" icon={DollarSign} gradient="primary" subtitle="Tahun 2026" />
        <StatCard title="Total Pesanan" value="4,821" icon={ShoppingBag} gradient="accent" subtitle="Tahun 2026" />
        <StatCard title="Pertumbuhan" value="+18%" icon={TrendingUp} gradient="warm" subtitle="YoY" />
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-card">
        <h3 className="font-semibold mb-3">Ringkasan per Bulan</h3>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-muted-foreground">
              <th className="pb-2">Bulan</th><th className="pb-2">Pesanan</th><th className="pb-2">Pendapatan</th><th className="pb-2">Pertumbuhan</th>
            </tr></thead>
            <tbody>
              {[
                { m: "Januari", o: 623, r: "Rp 12.4 Jt", g: "+5%" },
                { m: "Februari", o: 789, r: "Rp 15.8 Jt", g: "+27%" },
                { m: "Maret", o: 710, r: "Rp 14.2 Jt", g: "-10%" },
                { m: "April", o: 925, r: "Rp 18.5 Jt", g: "+30%" },
                { m: "Mei", o: 835, r: "Rp 16.7 Jt", g: "-10%" },
                { m: "Juni", o: 939, r: "Rp 21.3 Jt", g: "+28%" },
              ].map((row) => (
                <tr key={row.m} className="border-b last:border-0">
                  <td className="py-2.5 font-medium">{row.m}</td>
                  <td className="py-2.5">{row.o}</td>
                  <td className="py-2.5">{row.r}</td>
                  <td className={`py-2.5 font-medium ${row.g.startsWith("+") ? "text-success" : "text-destructive"}`}>{row.g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
