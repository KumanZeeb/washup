import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore, type UserRole } from "@/store/authStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const roleRedirects: Record<UserRole, string> = {
  customer: "/customer",
  admin: "/admin",
  courier: "/courier",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  // OTP state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Admin/Courier state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Demo login
  const demoLogin = (role: UserRole) => {
    const demoUsers: Record<UserRole, { id: string; name: string; email: string; phone: string }> = {
      customer: { id: "c1", name: "Budi Santoso", email: "budi@mail.com", phone: "081234567890" },
      admin: { id: "a1", name: "Admin Utama", email: "admin@washup.com", phone: "081000000001" },
      courier: { id: "k1", name: "Joko Prasetyo", email: "joko@washup.com", phone: "081000000002" },
    };
    setAuth({ ...demoUsers[role], role }, "demo-token");
    toast({ title: "Login berhasil", description: `Masuk sebagai ${role}` });
    navigate(roleRedirects[role]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        {/* Brand */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-primary">Wash</span>Up
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Laundry management platform</p>
        </div>

        <Tabs defaultValue="otp" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="otp"><Phone className="h-4 w-4 mr-1" />OTP</TabsTrigger>
            <TabsTrigger value="email"><Mail className="h-4 w-4 mr-1" />Email</TabsTrigger>
          </TabsList>

          {/* OTP Login */}
          <TabsContent value="otp" className="space-y-4 mt-4">
            {!otpSent ? (
              <>
                <div className="space-y-2">
                  <Label>Nomor HP</Label>
                  <Input placeholder="081234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <Button className="w-full gradient-primary" onClick={() => { setOtpSent(true); toast({ title: "OTP Terkirim" }); }}>
                  Kirim OTP <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2 text-center">
                  <Label>Masukkan Kode OTP</Label>
                  <p className="text-xs text-muted-foreground">Dikirim ke {phone}</p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <Button className="w-full gradient-primary" onClick={() => demoLogin("customer")}>
                  Verifikasi
                </Button>
                <Button variant="link" className="w-full text-xs" onClick={() => setOtpSent(false)}>
                  Ganti nomor
                </Button>
              </>
            )}
          </TabsContent>

          {/* Email Login */}
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="admin@washup.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full gradient-primary" onClick={() => demoLogin("admin")}>
              Masuk
            </Button>
          </TabsContent>
        </Tabs>

        {/* Demo shortcuts */}
        <div className="space-y-2 pt-4 border-t">
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Demo Login</p>
          <div className="flex gap-2">
            {(["customer", "admin", "courier"] as UserRole[]).map((role) => (
              <Button key={role} variant="outline" size="sm" className="flex-1 text-xs capitalize" onClick={() => demoLogin(role)}>
                {role === "customer" ? "Pelanggan" : role === "admin" ? "Admin" : "Kurir"}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
