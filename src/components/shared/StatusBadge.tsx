import { cn } from "@/lib/utils";

type Status = "pending" | "processing" | "washing" | "drying" | "ready" | "picked_up" | "delivered" | "cancelled" | "completed" | string;

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Menunggu", className: "bg-warning/15 text-warning border-warning/25" },
  processing: { label: "Diproses", className: "bg-info/15 text-info border-info/25" },
  washing: { label: "Mencuci", className: "bg-info/15 text-info border-info/25" },
  drying: { label: "Mengeringkan", className: "bg-accent/15 text-accent border-accent/25" },
  ready: { label: "Siap Ambil", className: "bg-success/15 text-success border-success/25" },
  picked_up: { label: "Dijemput", className: "bg-primary/15 text-primary border-primary/25" },
  delivered: { label: "Diantar", className: "bg-success/15 text-success border-success/25" },
  completed: { label: "Selesai", className: "bg-success/15 text-success border-success/25" },
  cancelled: { label: "Dibatalkan", className: "bg-destructive/15 text-destructive border-destructive/25" },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const config = statusConfig[status] || { label: status, className: "bg-muted text-muted-foreground border-border" };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", config.className, className)}>
      {config.label}
    </span>
  );
}
