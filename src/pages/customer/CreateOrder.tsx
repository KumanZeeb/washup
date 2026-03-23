import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const services = [
  { id: "regular", label: "Cuci Reguler", pricePerKg: 7000 },
  { id: "dryclean", label: "Dry Clean", pricePerKg: 25000 },
  { id: "ironing", label: "Setrika", pricePerKg: 5000 },
  { id: "blanket", label: "Cuci Selimut", pricePerKg: 30000 },
];

export default function CreateOrder() {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const selected = services.find((s) => s.id === service);
  const total = selected && weight ? selected.pricePerKg * parseFloat(weight) : 0;

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
                <SelectItem key={s.id} value={s.id}>{s.label} — Rp {s.pricePerKg.toLocaleString("id-ID")}/{s.id === "dryclean" || s.id === "blanket" ? "pcs" : "kg"}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Estimasi Berat (kg)</Label>
          <Input type="number" placeholder="3.5" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Alamat Jemput</Label>
          <Textarea placeholder="Jl. Merdeka No. 10..." value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Catatan (opsional)</Label>
          <Input placeholder="Pisahkan warna putih" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      {/* Pricing preview */}
      {total > 0 && (
        <div className="rounded-xl border bg-primary/5 p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Calculator className="h-4 w-4 text-primary" /> Estimasi Harga
          </div>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-sm text-muted-foreground">{selected?.label} × {weight} kg</span>
            <span className="text-xl font-bold text-primary">Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>
      )}

      <Button className="w-full gradient-primary h-12 font-semibold" disabled={!service || !weight || !address} onClick={handleSubmit}>
        Buat Pesanan
      </Button>
    </div>
  );
}
