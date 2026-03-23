import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Tag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Promo { id: string; code: string; title: string; discount: string; validUntil: string; }

const initial: Promo[] = [
  { id: "1", code: "HEMAT20", title: "Diskon 20%", discount: "20%", validUntil: "28 Feb 2026" },
  { id: "2", code: "NEWUSER", title: "Gratis Ongkir", discount: "Free Delivery", validUntil: "31 Mar 2026" },
];

export default function AdminPromos() {
  const [promos, setPromos] = useState(initial);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Promo</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-primary"><Plus className="mr-1 h-4 w-4" /> Tambah</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Promo</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Kode</Label><Input placeholder="HEMAT20" /></div>
              <div><Label>Judul</Label><Input placeholder="Diskon 20%" /></div>
              <div><Label>Berlaku Sampai</Label><Input type="date" /></div>
              <Button className="w-full gradient-primary" onClick={() => { setOpen(false); toast({ title: "Promo ditambahkan" }); }}>Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {promos.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2"><Tag className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="font-semibold text-sm">{p.title}</p>
                <p className="text-xs text-muted-foreground"><code className="bg-muted px-1 rounded">{p.code}</code> · s/d {p.validUntil}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { setPromos((s) => s.filter((x) => x.id !== p.id)); toast({ title: "Promo dihapus" }); }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
