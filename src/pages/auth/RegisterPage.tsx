import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = name && phone && email && password && password === confirmPassword;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({ title: "Password tidak cocok", variant: "destructive" });
      return;
    }

    setLoading(true);

    // Demo registration — langsung login sebagai customer
    setTimeout(() => {
      const demoUser = {
        id: `c-${Date.now()}`,
        name,
        email,
        phone,
        role: "customer" as const,
      };
      setAuth(demoUser, "demo-token");
      toast({ title: "Pendaftaran berhasil! ", description: "Selamat datang di WashUp" });
      navigate("/customer");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Link>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-primary">Wash</span>Up
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Buat akun baru</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nama Lengkap</Label>
            <Input placeholder="Budiono Siregar" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>No. WhatsApp</Label>
            <Input type="tel" placeholder="081234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="budi@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Min. 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Konfirmasi Password</Label>
            <Input
              type="password"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-destructive">Password tidak cocok</p>
            )}
          </div>

          <Button
            className="w-full gradient-primary h-12 font-semibold"
            disabled={!canSubmit || loading}
            onClick={handleRegister}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Mendaftar...
              </span>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" /> Daftar Sekarang
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-medium text-primary underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
