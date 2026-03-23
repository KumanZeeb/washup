import { Gift, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const promos = [
  { id: "1", code: "HEMAT20", title: "Diskon 20%", desc: "Untuk cuci reguler min. 5kg", validUntil: "28 Feb 2026", claimed: false },
  { id: "2", code: "NEWUSER", title: "Gratis Ongkir", desc: "Untuk pengguna baru", validUntil: "31 Mar 2026", claimed: true },
  { id: "3", code: "SELIMUT10", title: "Diskon 10%", desc: "Cuci selimut & bed cover", validUntil: "15 Mar 2026", claimed: false },
];

export default function PromosPage() {
  const claim = (code: string) => toast({ title: "Promo Diklaim!", description: `Kode ${code} berhasil diklaim` });

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold">Promo & Voucher</h2>
      <div className="space-y-3">
        {promos.map((p) => (
          <div key={p.id} className="relative overflow-hidden rounded-xl border bg-card p-4 shadow-soft">
            <div className="absolute left-0 top-0 bottom-0 w-1 gradient-primary" />
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2"><Gift className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="font-semibold text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Berlaku s/d {p.validUntil}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <code className="rounded bg-muted px-2 py-0.5 text-xs font-bold">{p.code}</code>
                {p.claimed ? (
                  <p className="text-[10px] text-success font-medium">✓ Diklaim</p>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs h-7 mt-1" onClick={() => claim(p.code)}>
                    <Copy className="h-3 w-3 mr-1" /> Klaim
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
