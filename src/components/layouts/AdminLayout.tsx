import { Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, Users, Wrench, Tag, BarChart3, LogOut, Menu, WashingMachine, Info, Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { NotificationDropdown } from "@/components/shared/NotificationDropdown.tsx";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/orders", icon: ShoppingBag, label: "Pesanan" },
  { to: "/admin/laundry", icon: WashingMachine, label: "Proses Cucian" },
  { to: "/admin/couriers", icon: Users, label: "Kurir" },
  { to: "/admin/services", icon: Wrench, label: "Layanan" },
  { to: "/admin/promos", icon: Tag, label: "Promo" },
  { to: "/admin/reports", icon: BarChart3, label: "Laporan" },
  { to: "/admin/dev-info", icon: Info, label: "Info Aplikasi" },
  { to: "/admin/settings", icon: Settings, label: "Pengaturan" },
];

function AdminSidebar() {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);

  return (
    <Sidebar className="border-r">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <span className="text-lg font-bold"><span className="text-primary">Wash</span>Up</span>
        <span className="text-[10px] rounded bg-primary/10 text-primary px-1.5 py-0.5 font-semibold">Admin</span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((l) => (
                <SidebarMenuItem key={l.to}>
                  <SidebarMenuButton asChild>
                    <NavLink to={l.to} end={l.to === "/admin"} activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold">
                      <l.icon className="mr-2 h-4 w-4" />
                      <span>{l.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto border-t p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" /> Keluar
        </Button>
      </div>
    </Sidebar>
  );
}

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card/80 backdrop-blur-md px-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <NotificationDropdown />
          </header>
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
