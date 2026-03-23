import { useState } from "react";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Courier { 
  id: string; 
  name: string; 
  phone: string; 
  status: string; 
  tasks: number; 
  rating: number; 
  [key: string]: unknown; 
}

const initialCouriers: Courier[] = [
  { id: "K1", name: "Joko Prasetyo", phone: "0812xxx", status: "completed", tasks: 12, rating: 4.8 },
  { id: "K2", name: "Ahmad Fauzi", phone: "0813xxx", status: "processing", tasks: 8, rating: 4.5 },
  { id: "K3", name: "Rizki Hidayat", phone: "0815xxx", status: "pending", tasks: 0, rating: 4.9 },
];

export default function AdminCouriers() {
  const [couriers, setCouriers] = useState(initialCouriers);
  const [openTambah, setOpenTambah] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState<Courier | null>(null);
  const [newCourier, setNewCourier] = useState({
    name: "",
    phone: "",
    status: "pending",
    tasks: 0,
    rating: 0
  });

  const handleDelete = (id: string) => {
    setCouriers((s) => s.filter((x) => x.id !== id));
    toast({ title: "Kurir dihapus", description: "Data kurir berhasil dihapus" });
  };

  const handleEdit = (courier: Courier) => {
    setEditData(courier);
    setOpenEdit(true);
  };

  const handleUpdate = () => {
    if (!editData) return;
    
    setCouriers((s) => s.map((item) => 
      item.id === editData.id ? editData : item
    ));
    setOpenEdit(false);
    toast({ title: "Kurir diperbarui", description: "Data kurir berhasil diupdate" });
  };

  const handleTambah = () => {
    if (!newCourier.name || !newCourier.phone) {
      toast({ 
        title: "Gagal", 
        description: "Nama dan telepon harus diisi",
        variant: "destructive"
      });
      return;
    }

    const newId = `K${couriers.length + 1}`;
    setCouriers([...couriers, { ...newCourier, id: newId }]);
    setOpenTambah(false);
    setNewCourier({ name: "", phone: "", status: "pending", tasks: 0, rating: 0 });
    toast({ title: "Kurir ditambahkan", description: "Data kurir baru berhasil disimpan" });
  };

  const columns: Column<Courier>[] = [
    { key: "name", header: "Nama" },
    { key: "phone", header: "Telepon" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "tasks", header: "Tugas Aktif" },
    { key: "rating", header: "Rating", render: (r) => <span>⭐ {r.rating}</span> },
    {
      key: "actions",
      header: "Aksi",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(r)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(r.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Kurir</h1>
        <Dialog open={openTambah} onOpenChange={setOpenTambah}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-primary">
              <Plus className="mr-1 h-4 w-4" /> Tambah Kurir
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Kurir Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Nama Kurir</Label>
                <Input 
                  placeholder="Masukkan nama"
                  value={newCourier.name}
                  onChange={(e) => setNewCourier({ ...newCourier, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Nomor Telepon</Label>
                <Input 
                  placeholder="0812xxxx"
                  value={newCourier.phone}
                  onChange={(e) => setNewCourier({ ...newCourier, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Status</Label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newCourier.status}
                  onChange={(e) => setNewCourier({ ...newCourier, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <Label>Rating Awal</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.5"
                  value={newCourier.rating}
                  onChange={(e) => setNewCourier({ ...newCourier, rating: Number(e.target.value) })}
                />
              </div>
              <Button className="w-full gradient-primary" onClick={handleTambah}>
                Simpan Kurir
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dialog Edit */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Kurir</DialogTitle></DialogHeader>
          {editData && (
            <div className="space-y-3">
              <div>
                <Label>Nama Kurir</Label>
                <Input 
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Nomor Telepon</Label>
                <Input 
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Status</Label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <Label>Jumlah Tugas</Label>
                <Input 
                  type="number"
                  value={editData.tasks}
                  onChange={(e) => setEditData({ ...editData, tasks: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Rating</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="5"
                  value={editData.rating}
                  onChange={(e) => setEditData({ ...editData, rating: Number(e.target.value) })}
                />
              </div>
              <Button className="w-full gradient-primary" onClick={handleUpdate}>
                Update Kurir
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DataTable 
        columns={columns} 
        data={couriers} 
        searchable 
        searchKeys={["name", "phone"]} 
      />
    </div>
  );
}