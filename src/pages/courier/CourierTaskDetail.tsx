import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, MapPin, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useState } from "react";

export default function CourierTaskDetail() {
  const { id } = useParams();
  const [status, setStatus] = useState("picked_up");

  const handlePhotoUpload = () => {
    toast({ title: "Foto bukti diupload", description: "Bukti pengiriman berhasil disimpan" });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/courier"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
        <h2 className="text-lg font-bold">Tugas {id}</h2>
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-soft space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Andi Wijaya</p>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> Jl. Gatot Subroto 22</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="h-4 w-4" /> 081234xxx</div>
        <p className="text-xs text-muted-foreground">Pesanan: WU-1232 · Cuci Reguler · 4 kg</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Update Status</label>
          <Select value={status} onValueChange={(val) => { setStatus(val); toast({ title: `Status diupdate: ${val}` }); }}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="picked_up">Dijemput</SelectItem>
              <SelectItem value="delivered">Diantar</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="w-full" onClick={handlePhotoUpload}>
          <Camera className="mr-2 h-4 w-4" /> Upload Bukti Foto
        </Button>
      </div>
    </div>
  );
}
