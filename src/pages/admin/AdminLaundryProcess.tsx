import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Search,
  ArrowRight,
  Camera,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Package,
  Droplets,
  Wind,
  Shirt,
  CheckCircle2,
  Phone,
  User,
  Clock,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";

/* ── Status config ────────────────────────── */
const STATUSES = [
  { key: "received", label: "Diterima", icon: Package, color: "bg-info/15 text-info border-info/30" },
  { key: "washing", label: "Dicuci", icon: Droplets, color: "bg-primary/15 text-primary border-primary/30" },
  { key: "drying", label: "Dikeringkan", icon: Wind, color: "bg-warning/15 text-warning border-warning/30" },
  { key: "ironing", label: "Disetrika", icon: Shirt, color: "bg-accent/15 text-accent border-accent/30" },
  { key: "done", label: "Selesai", icon: CheckCircle2, color: "bg-success/15 text-success border-success/30" },
] as const;

type StatusKey = (typeof STATUSES)[number]["key"];

interface LaundryItem {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  service: string;
  status: StatusKey;
  items: string;
  weight: string;
  createdAt: string;
  notes?: string;
  proofImage?: string;
}

/* ── Mock data ────────────────────────────── */
const MOCK_DATA: LaundryItem[] = [
  { id: "1", orderCode: "WU-20240301", customerName: "Rina Sari", customerPhone: "6281234567890", service: "Cuci Setrika", status: "received", items: "5 pcs", weight: "3.2 kg", createdAt: "2024-03-01 09:00", notes: "Pisahkan warna gelap" },
  { id: "2", orderCode: "WU-20240302", customerName: "Budi Santoso", customerPhone: "6281298765432", service: "Cuci Kering", status: "washing", items: "8 pcs", weight: "4.5 kg", createdAt: "2024-03-01 10:30" },
  { id: "3", orderCode: "WU-20240303", customerName: "Dewi Lestari", customerPhone: "6285678901234", service: "Setrika Saja", status: "drying", items: "12 pcs", weight: "2.8 kg", createdAt: "2024-03-01 11:00" },
  { id: "4", orderCode: "WU-20240304", customerName: "Ahmad Fauzi", customerPhone: "6287654321098", service: "Cuci Setrika", status: "ironing", items: "6 pcs", weight: "3.0 kg", createdAt: "2024-03-02 08:00" },
  { id: "5", orderCode: "WU-20240305", customerName: "Siti Aminah", customerPhone: "6289012345678", service: "Express Cuci", status: "done", items: "4 pcs", weight: "2.1 kg", createdAt: "2024-03-02 09:15", proofImage: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&q=80" },
];

/* ── Status filter pills ──────────────────── */
function StatusFilter({ active, onChange }: { active: StatusKey | "all"; onChange: (v: StatusKey | "all") => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
      <button
        onClick={() => onChange("all")}
        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
          active === "all" ? "gradient-primary text-primary-foreground shadow-soft" : "bg-secondary text-muted-foreground"
        }`}
      >
        Semua
      </button>
      {STATUSES.map((s) => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold border transition-all ${
            active === s.key ? s.color + " shadow-soft" : "bg-secondary text-muted-foreground border-transparent"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

/* ── Progress stepper (horizontal, compact) ── */
function ProgressStepper({ current }: { current: StatusKey }) {
  const currentIdx = STATUSES.findIndex((s) => s.key === current);

  return (
    <div className="flex items-center gap-0.5 w-full">
      {STATUSES.map((s, i) => {
        const done = i <= currentIdx;
        const Icon = s.icon;
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div
              className={`flex items-center justify-center rounded-full shrink-0 transition-all ${
                done
                  ? i === currentIdx
                    ? "w-7 h-7 " + s.color + " border"
                    : "w-5 h-5 bg-success/20 text-success"
                  : "w-5 h-5 bg-muted text-muted-foreground"
              }`}
            >
              <Icon className={i === currentIdx ? "w-3.5 h-3.5" : "w-3 h-3"} />
            </div>
            {i < STATUSES.length - 1 && (
              <div className={`h-0.5 flex-1 mx-0.5 rounded-full ${i < currentIdx ? "bg-success/40" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Laundry Card ─────────────────────────── */
function LaundryCard({
  item,
  onAdvance,
  onUploadProof,
  onSendWA,
}: {
  item: LaundryItem;
  onAdvance: (item: LaundryItem) => void;
  onUploadProof: (item: LaundryItem) => void;
  onSendWA: (item: LaundryItem) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUSES.find((s) => s.key === item.status)!;
  const StatusIcon = statusCfg.icon;
  const currentIdx = STATUSES.findIndex((s) => s.key === item.status);
  const nextStatus = currentIdx < STATUSES.length - 1 ? STATUSES[currentIdx + 1] : null;

  return (
    <Card className="overflow-hidden shadow-card border-border/60">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-3.5 flex items-start gap-3 active:bg-muted/50 transition-colors"
      >
        {/* Status icon */}
        <div className={`rounded-xl p-2 shrink-0 border ${statusCfg.color}`}>
          <StatusIcon className="w-4 h-4" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-sm text-foreground truncate">{item.orderCode}</span>
            <Badge variant="outline" className={`shrink-0 text-[10px] px-2 py-0.5 border ${statusCfg.color}`}>
              {statusCfg.label}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span className="truncate">{item.customerName}</span>
            <span className="text-border">·</span>
            <span>{item.service}</span>
          </div>
          <div className="mt-2">
            <ProgressStepper current={item.status} />
          </div>
        </div>

        {/* Expand toggle */}
        <div className="shrink-0 mt-1 text-muted-foreground">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t bg-muted/30 px-3.5 pb-3.5 pt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Package className="w-3 h-3" />
              <span>{item.items} — {item.weight}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{item.createdAt}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
              <Phone className="w-3 h-3" />
              <span>+{item.customerPhone}</span>
            </div>
          </div>

          {item.notes && (
            <div className="rounded-lg bg-warning/10 border border-warning/20 px-3 py-2 text-xs text-warning">
              📝 {item.notes}
            </div>
          )}

          {/* Proof image preview */}
          {item.proofImage && (
            <div className="rounded-lg overflow-hidden border border-border">
              <img src={item.proofImage} alt="Bukti cucian selesai" className="w-full h-32 object-cover" />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            {item.status !== "done" && nextStatus && (
              <Button
                size="sm"
                className="flex-1 gradient-primary text-primary-foreground text-xs h-9"
                onClick={() => onAdvance(item)}
              >
                <ArrowRight className="w-3.5 h-3.5 mr-1.5" />
                {nextStatus.label}
              </Button>
            )}

            {item.status === "ironing" && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-9"
                onClick={() => onUploadProof(item)}
              >
                <Camera className="w-3.5 h-3.5 mr-1.5" />
                Foto
              </Button>
            )}

            {item.status === "done" && (
              <Button
                size="sm"
                className="flex-1 bg-success text-success-foreground hover:bg-success/90 text-xs h-9"
                onClick={() => onSendWA(item)}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                Kirim ke WhatsApp
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

/* ── Upload proof dialog ──────────────────── */
function UploadProofDialog({
  open,
  item,
  onClose,
  onSubmit,
}: {
  open: boolean;
  item: LaundryItem | null;
  onClose: () => void;
  onSubmit: (id: string, file: File, note: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = () => {
    if (!file || !item) return;
    onSubmit(item.id, file, note);
    setFile(null);
    setPreview(null);
    setNote("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base">Upload Foto Hasil Cucian</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Upload area */}
          {preview ? (
            <div className="relative rounded-xl overflow-hidden border border-border">
              <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
              <button
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-2 right-2 rounded-full bg-foreground/60 text-background p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-border bg-muted/40 cursor-pointer hover:border-primary/50 transition-colors">
              <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground">Tap untuk ambil foto</span>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
            </label>
          )}

          <Textarea
            placeholder="Catatan (opsional)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="text-sm min-h-[60px]"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>
            Batal
          </Button>
          <Button
            size="sm"
            disabled={!file}
            className="gradient-primary text-primary-foreground"
            onClick={handleSubmit}
          >
            <Camera className="w-3.5 h-3.5 mr-1.5" />
            Simpan Foto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ── Main Page ────────────────────────────── */
export default function AdminLaundryProcess() {
  const [data, setData] = useState<LaundryItem[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusKey | "all">("all");
  const [proofDialog, setProofDialog] = useState<LaundryItem | null>(null);

  const filtered = data.filter((item) => {
    const matchSearch =
      item.orderCode.toLowerCase().includes(search.toLowerCase()) ||
      item.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Count per status
  const counts = STATUSES.reduce(
    (acc, s) => ({ ...acc, [s.key]: data.filter((d) => d.status === s.key).length }),
    {} as Record<string, number>
  );

  const handleAdvance = (item: LaundryItem) => {
    const currentIdx = STATUSES.findIndex((s) => s.key === item.status);
    if (currentIdx >= STATUSES.length - 1) return;
    const nextStatus = STATUSES[currentIdx + 1].key;
    setData((prev) => prev.map((d) => (d.id === item.id ? { ...d, status: nextStatus } : d)));
    toast.success(`${item.orderCode} → ${STATUSES[currentIdx + 1].label}`);
  };

  const handleUploadProof = (id: string, _file: File, _note: string) => {
    const url = URL.createObjectURL(_file);
    setData((prev) =>
      prev.map((d) => (d.id === id ? { ...d, proofImage: url, status: "done" as StatusKey } : d))
    );
    toast.success("Foto berhasil disimpan & status diperbarui ke Selesai");
  };

  const handleSendWA = (item: LaundryItem) => {
    const message = encodeURIComponent(
      `Halo ${item.customerName} 👋\n\nCucian Anda sudah selesai! ✨\n\n📋 Order: ${item.orderCode}\n👕 Layanan: ${item.service}\n📦 ${item.items} (${item.weight})\n\nSilakan hubungi kami untuk pengambilan/pengiriman.\n\nTerima kasih! 🙏\n— WashUp Laundry`
    );
    const waUrl = `https://wa.me/${item.customerPhone}?text=${message}`;
    window.open(waUrl, "_blank");
    toast.success("Membuka WhatsApp...");
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-lg font-bold text-foreground">Proses Cucian</h1>
        <p className="text-xs text-muted-foreground">Kelola status cucian pelanggan</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-5 gap-2">
        {STATUSES.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key === statusFilter ? "all" : s.key)}
              className={`rounded-xl p-2 text-center border transition-all ${
                statusFilter === s.key ? s.color + " shadow-soft" : "bg-card border-border/60"
              }`}
            >
              <Icon className="w-4 h-4 mx-auto mb-0.5" />
              <div className="text-base font-bold">{counts[s.key] ?? 0}</div>
              <div className="text-[9px] leading-tight text-muted-foreground">{s.label}</div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari order atau nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm bg-card"
        />
      </div>

      {/* Status filter pills */}
      <StatusFilter active={statusFilter} onChange={setStatusFilter} />

      {/* Cards list */}
      <div className="space-y-3 pb-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
            Tidak ada cucian ditemukan
          </div>
        ) : (
          filtered.map((item) => (
            <LaundryCard
              key={item.id}
              item={item}
              onAdvance={handleAdvance}
              onUploadProof={() => setProofDialog(item)}
              onSendWA={handleSendWA}
            />
          ))
        )}
      </div>

      {/* Upload proof dialog */}
      <UploadProofDialog
        open={!!proofDialog}
        item={proofDialog}
        onClose={() => setProofDialog(null)}
        onSubmit={handleUploadProof}
      />
    </div>
  );
}
