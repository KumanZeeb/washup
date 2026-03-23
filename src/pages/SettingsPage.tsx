import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun, Globe, User, Lock, ArrowLeft, Save } from "lucide-react";

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [language, setLanguage] = useState("id");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Nama dan nomor HP wajib diisi", variant: "destructive" });
      return;
    }
    updateUser({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    toast({ title: "Profil berhasil diperbarui ✅" });
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      toast({ title: "Isi semua field password", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Password minimal 6 karakter", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Password baru tidak cocok", variant: "destructive" });
      return;
    }
    toast({ title: "Password berhasil diubah ✅" });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const isDark = theme === "dark";

  return (
    <div className="space-y-5 animate-fade-in max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-bold">Pengaturan</h2>
      </div>

      {/* Tampilan / Dark Mode */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            Tampilan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Mode Gelap</p>
              <p className="text-xs text-muted-foreground">Aktifkan tema gelap untuk kenyamanan mata</p>
            </div>
            <Switch checked={isDark} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
          </div>
        </CardContent>
      </Card>

      {/* Bahasa */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Bahasa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">🇮🇩 Bahasa Indonesia</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">Fitur bahasa akan tersedia di versi mendatang</p>
        </CardContent>
      </Card>

      {/* Edit Profil */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <User className="h-4 w-4" />
            Ubah Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs">Nama</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs">Nomor WhatsApp</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button size="sm" className="w-full" onClick={handleSaveProfile}>
            <Save className="mr-2 h-4 w-4" /> Simpan Profil
          </Button>
        </CardContent>
      </Card>

      {/* Ubah Password */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Ubah Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="oldPw" className="text-xs">Password Lama</Label>
            <Input id="oldPw" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPw" className="text-xs">Password Baru</Label>
            <Input id="newPw" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPw" className="text-xs">Konfirmasi Password Baru</Label>
            <Input id="confirmPw" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button size="sm" variant="outline" className="w-full" onClick={handleChangePassword}>
            <Lock className="mr-2 h-4 w-4" /> Ubah Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
