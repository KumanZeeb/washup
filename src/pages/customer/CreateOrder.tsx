import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calculator, Store, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const services = [
  { id: "regular", label: "Cuci Reguler", pricePerKg: 7000, unit: "kg" },
  { id: "dryclean", label: "Dry Clean", pricePerKg: 25000, unit: "pcs" },
  { id: "ironing", label: "Setrika", pricePerKg: 5000, unit: "kg" },
  { id: "blanket", label: "Cuci Selimut", pricePerKg: 30000, unit: "pcs" },
];

type DeliveryMethod = "pickup" | "delivery";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [weight, setWeight] = useState("");
  const [method, setMethod] = useState<DeliveryMethod>("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const selected = services.find((s) => s.id === service);
  const total = selected && weight ? selected.pricePerKg * parseFloat(weight) : 0;
  const canSubmit = service && weight && (method === "pickup" || address);

  const handleSubmit = () => {
    toast({ title: "Pesanan Dibuat!", description: `Total: Rp ${total.toLocaleString("id-ID")}` });
    navigate("/customer/orders");
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/customer"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        <h2 className="text-lg font-bold">Buat Pesanan</h2>
      </div>

      <div className="space-y-4 rounded-xl border bg-card p-5 shadow-soft">
        <div className="space-y-2">
          <Label>Layanan</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger><SelectValue placeholder="Pilih layanan" /></SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.label} — Rp {s.pricePerKg.toLocaleString("id-ID")}/{s.unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Estimasi Berat / Jumlah</Label>
          <Input type="number" placeholder="3.5" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
      </div>

      {/* Delivery Method */}
      <div className="space-y-3 rounded-xl border bg-card p-4 shadow-soft">
        <Label className="text-sm font-bold">Metode Pengambilan</Label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMethod("pickup")}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
              method === "pickup"
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <Store className={`h-6 w-6 ${method === "pickup" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-semibold ${method === "pickup" ? "text-primary" : "text-foreground"}`}>Antar Sendiri</span>
            <span className="text-xs text-muted-foreground">Ke outlet kami</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod("delivery")}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
              method === "delivery"
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <MapPin className={`h-6 w-6 ${method === "delivery" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-semibold ${method === "delivery" ? "text-primary" : "text-foreground"}`}>Jemput</span>
            <span className="text-xs text-muted-foreground">Kami ke lokasi</span>
          </button>
        </div>

        {method === "delivery" && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Label>Alamat Jemput</Label>
            <Textarea placeholder="Jl. Merdeka No. 10..." value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        )}
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-soft">
        <div className="space-y-2">
          <Label>Catatan (opsional)</Label>
          <Input placeholder="Pisahkan warna putih, dll" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      {/* Pricing preview */}
      {total > 0 && (
        <div className="rounded-xl border bg-primary/5 p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Calculator className="h-4 w-4 text-primary" /> Estimasi Harga
          </div>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-sm text-muted-foreground">{selected?.label} × {weight} {selected?.unit}</span>
            <span className="text-xl font-bold text-primary">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      )}

      <Button className="w-full gradient-primary h-12 font-semibold" disabled={!canSubmit} onClick={handleSubmit}>
        Buat Pesanan
      </Button>
    </div>
  );
}
