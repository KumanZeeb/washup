import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <ShieldX className="mx-auto h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Akses Ditolak</h1>
        <p className="text-muted-foreground mb-4">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <Link to="/login"><Button>Kembali ke Login</Button></Link>
      </div>
    </div>
  );
}
