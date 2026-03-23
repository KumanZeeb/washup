import { cn } from "@/lib/utils";
import { Check, Clock, Package, Truck, Sparkles } from "lucide-react";

export interface TimelineStep {
  label: string;
  description?: string;
  time?: string;
  status: "completed" | "current" | "upcoming";
}

const iconMap: Record<string, React.ElementType> = {
  "Pesanan Dibuat": Package,
  "Dijemput": Truck,
  "Dicuci": Sparkles,
  "Siap Antar": Check,
  "Diantar": Truck,
  "Selesai": Check,
};

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const Icon = iconMap[step.label] || Clock;
        const isLast = i === steps.length - 1;
        return (
          <div key={i} className="flex gap-3">
            {/* line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                  step.status === "completed" && "border-success bg-success text-success-foreground",
                  step.status === "current" && "border-primary bg-primary text-primary-foreground animate-pulse",
                  step.status === "upcoming" && "border-border bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              {!isLast && (
                <div className={cn("w-0.5 flex-1 min-h-[24px]", step.status === "completed" ? "bg-success" : "bg-border")} />
              )}
            </div>
            {/* content */}
            <div className="pb-6">
              <p className={cn("text-sm font-semibold", step.status === "upcoming" && "text-muted-foreground")}>{step.label}</p>
              {step.description && <p className="text-xs text-muted-foreground">{step.description}</p>}
              {step.time && <p className="text-xs text-muted-foreground mt-0.5">{step.time}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
