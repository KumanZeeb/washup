import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Service { id: string; name: string; price: number; unit: string; category: string; }

const initial: Service[] = [
  { id: "1", name: "Cuci Reguler", price: 7000, unit: "kg", category: "Cuci" },
  { id: "2", name: "Dry Clean", price: 25000, unit: "pcs", category: "Premium" },
  { id: "3", name: "Setrika", price: 5000, unit: "kg", category: "Cuci" },
  { id: "4", name: "Cuci Selimut", price: 30000, unit: "pcs", category: "Premium" },
];

export default function AdminServices() {
  const [services, setServices] = useState(initial);
  const [openTambah, setOpenTambah] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<Service | null>(null);

  const handleDelete = (id: string) => {
    setServices((s) => s.filter((x) => x.id !== id));
    toast({ title: "Layanan dihapus" });
  };

  const handleEdit = (service: Service) => {
    setEditData(service);
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    if (!editData) return;
    
    setServices((s) => s.map((item) => 
      item.id === editData.id ? editData : item
    ));
    setOpenEdit(false);
    toast({ title: "Layanan diperbarui" });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Layanan</h1>
        <Dialog open={openTambah} onOpenChange={setOpenTambah}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-primary"><Plus className="mr-1 h-4 w-4" /> Tambah</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Layanan Baru</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Nama</Label><Input placeholder="Nama layanan" /></div>
              <div><Label>Harga</Label><Input type="number" placeholder="10000" /></div>
              <div><Label>Satuan</Label><Input placeholder="kg / pcs" /></div>
              <Button className="w-full gradient-primary" onClick={() => { setOpenTambah(false); toast({ title: "Layanan ditambahkan" }); }}>Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog Edit */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Layanan</DialogTitle></DialogHeader>
          {editData && (
            <div className="space-y-3">
              <div>
                <Label>Nama</Label>
                <Input 
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Nama layanan"
                />
              </div>
              <div>
                <Label>Harga</Label>
                <Input 
                  type="number" 
                  value={editData.price}
                  onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label>Satuan</Label>
                <Input 
                  value={editData.unit}
                  onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
                  placeholder="kg / pcs"
                />
              </div>
              <div>
                <Label>Kategori</Label>
                <Input 
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  placeholder="Cuci / Premium"
                />
              </div>
              <Button className="w-full gradient-primary" onClick={handleUpdate}>
                Update
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-soft">
            <div>
              <p className="font-semibold text-sm">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.category} · Rp {s.price.toLocaleString("id-ID")}/{s.unit}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(s)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(s.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}