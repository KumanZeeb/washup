import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, LogOut, ChevronRight, Star, HelpCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  const menuItems = [
    { icon: Star, label: "Ulasan Saya" },
    { icon: HelpCircle, label: "Bantuan" },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-lg font-bold">Profil</h2>

      <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-soft">
        <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-primary-foreground text-xl font-bold">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> {user?.phone}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground"><Mail className="h-3 w-3" /> {user?.email}</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-soft overflow-hidden">
        {menuItems.map((item, i) => (
          <button key={i} className="flex w-full items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b last:border-b-0">
            <div className="flex items-center gap-3 text-sm"><item.icon className="h-4 w-4 text-muted-foreground" />{item.label}</div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Button variant="outline" className="w-full text-destructive border-destructive/25 hover:bg-destructive/5" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" /> Keluar
      </Button>
    </div>
  );
}
