import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", title: "Pesanan Siap", message: "Pesanan #1234 siap untuk dijemput", time: "5 menit lalu", read: false },
  { id: "2", title: "Promo Baru!", message: "Diskon 20% untuk cuci selimut", time: "1 jam lalu", read: false },
  { id: "3", title: "Pengiriman Selesai", message: "Pesanan #1230 telah diantar", time: "2 jam lalu", read: true },
];

export function NotificationDropdown() {
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b p-3">
          <h4 className="text-sm font-semibold">Notifikasi</h4>
        </div>
        <div className="max-h-80 overflow-auto">
          {mockNotifications.map((n) => (
            <div key={n.id} className={`border-b p-3 text-sm ${!n.read ? "bg-primary/5" : ""}`}>
              <p className="font-medium">{n.title}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{n.message}</p>
              <p className="text-muted-foreground text-[10px] mt-1">{n.time}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
