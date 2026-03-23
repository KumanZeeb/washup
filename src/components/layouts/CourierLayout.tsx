import { Outlet, Link, useLocation } from "react-router-dom";
import { ClipboardList, DollarSign, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationDropdown } from "@/components/shared/NotificationDropdown.tsx";

const navItems = [
  { to: "/courier", icon: ClipboardList, label: "Tugas" },
  { to: "/courier/earnings", icon: DollarSign, label: "Penghasilan" },
  { to: "/courier/settings", icon: Settings, label: "Setting" },
];

export default function CourierLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <Link to="/courier" className="text-lg font-bold">
            <span className="text-primary">Wash</span>Up <span className="text-[10px] rounded bg-primary/10 text-primary px-1.5 py-0.5 font-semibold">Kurir</span>
          </Link>
          <NotificationDropdown />
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-4 pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-40 border-t bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
          {navItems.map((item) => {
            const active = pathname === item.to || (item.to !== "/courier" && pathname.startsWith(item.to));
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
