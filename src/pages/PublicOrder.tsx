import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calculator, Sparkles, MapPin, Store } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const services = [
  { id: "regular", label: "Cuci Reguler", pricePerKg: 7000, unit: "kg" },
  { id: "dryclean", label: "Dry Clean", pricePerKg: 25000, unit: "pcs" },
  { id: "ironing", label: "Setrika", pricePerKg: 5000, unit: "kg" },
  { id: "blanket", label: "Cuci Selimut", pricePerKg: 30000, unit: "pcs" },
];

type DeliveryMethod = "pickup" | "delivery";

export default function PublicOrder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [weight, setWeight] = useState("");
  const [method, setMethod] = useState<DeliveryMethod>("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selected = services.find((s) => s.id === service);
  const total = selected && weight ? selected.pricePerKg * parseFloat(weight) : 0;

  const canSubmit = name && phone && service && weight && (method === "pickup" || address);

  const handleSubmit = () => {
    // Format WhatsApp yang cantik dan mudah dibaca
    const lines = [
      `*HALO WASHUP!* `,
      `Saya mau pesan laundry nih~`,
      ``,
      `*📋 DATA DIRI*`,
      `• Nama: ${name}`,
      `• WhatsApp: ${phone}`,
      ``,
      `*🧺 DETAIL PESANAN*`,
      `• Layanan: ${selected?.label}`,
      `• ${selected?.unit === 'kg' ? 'Berat' : 'Jumlah'}: ${weight} ${selected?.unit}`,
      `• Estimasi: Rp ${total.toLocaleString("id-ID")}`,
      ``,
      `*🚚 METODE*`,
      `• ${method === "pickup" ? "🏪 Antar sendiri ke outlet" : "🛵 Jemput di alamat"}`,
      method === "delivery" ? `• Alamat: ${address}` : '',
      ``,
      notes ? `*📝 CATATAN*\n${notes}\n` : '',
      `------------------------------------`,
      `✨ *Total: Rp ${total.toLocaleString("id-ID")}*`,
      ``,
      `Makasih WashUp! 🙏`
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/6285723470609?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, "_blank");

    setSubmitted(true);
    toast({ 
      title: "Pesanan Dikirim!", 
      description: "Cek WhatsApp kamu untuk konfirmasi lebih lanjut." 
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Pesanan Terkirim!</h2>
          <p className="text-sm text-muted-foreground">
            Kami akan segera konfirmasi via WhatsApp. Terima kasih sudah mempercayai WashUp!
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => setSubmitted(false)} className="gradient-primary font-semibold">Pesan Lagi</Button>
            <Link to="/"><Button variant="outline" className="w-full">Kembali ke Beranda</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <h1 className="text-lg font-bold text-foreground">Pesan Laundry</h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg space-y-4 px-4 py-5">
        {/* Contact */}
        <div className="space-y-3 rounded-xl border bg-card p-4 shadow-soft">
          <h3 className="text-sm font-bold text-foreground">Data Pemesan</h3>
          <div className="space-y-2">
            <Label>Nama</Label>
            <Input placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>No. WhatsApp</Label>
            <Input type="tel" placeholder="08123456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        {/* Service */}
        <div className="space-y-3 rounded-xl border bg-card p-4 shadow-soft">
          <h3 className="text-sm font-bold text-foreground">Detail Layanan</h3>
          <div className="space-y-2">
            <Label>Layanan</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger><SelectValue placeholder="Pilih layanan" /></SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label} — Rp {s.pricePerKg.toLocaleString("id-ID")}/{s.unit}
                  </SelectItem>
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
          <h3 className="text-sm font-bold text-foreground">Metode Pengambilan</h3>
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
              <span className={`text-sm font-semibold ${method === "pickup" ? "text-primary" : "text-foreground"}`}>
                Antar Sendiri
              </span>
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
              <span className={`text-sm font-semibold ${method === "delivery" ? "text-primary" : "text-foreground"}`}>
                Jemput
              </span>
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

        {/* Notes */}
        <div className="rounded-xl border bg-card p-4 shadow-soft">
          <div className="space-y-2">
            <Label>Catatan (opsional)</Label>
            <Input placeholder="Pisahkan warna putih, dll" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        {/* Price */}
        {total > 0 && (
          <div className="rounded-xl border bg-primary/5 p-4 shadow-soft">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Calculator className="h-4 w-4 text-primary" /> Estimasi Harga
            </div>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-sm text-muted-foreground">{selected?.label} × {weight} {selected?.unit}</span>
              <span className="text-xl font-bold text-primary">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        )}

        <Button
          className="w-full gradient-primary h-12 font-semibold"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          Kirim Pesanan via WhatsApp
        </Button>

        <p className="pb-6 text-center text-xs text-muted-foreground">
          Sudah punya akun? <Link to="/login" className="font-medium text-primary underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}