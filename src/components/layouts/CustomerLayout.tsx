import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Wallet, User, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/components/shared/NotificationDropdown.tsx";

const navItems = [
  { to: "/customer", icon: Home, label: "Beranda" },
  { to: "/customer/orders", icon: ShoppingBag, label: "Pesanan" },
  { to: "/customer/wallet", icon: Wallet, label: "Dompet" },
  { to: "/customer/promos", icon: Gift, label: "Promo" },
  { to: "/customer/profile", icon: User, label: "Profil" },
];

export default function CustomerLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <Link to="/customer" className="text-lg font-bold tracking-tight">
            <span className="text-primary">Wash</span>Up
          </Link>
          <NotificationDropdown />
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-4 pb-20">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 border-t bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
          {navItems.map((item) => {
            const active = pathname === item.to || (item.to !== "/customer" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", active && "drop-shadow-sm")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
