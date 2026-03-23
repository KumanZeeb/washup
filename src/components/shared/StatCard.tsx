import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  gradient?: "primary" | "accent" | "warm";
  className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, gradient, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated",
        className
      )}
    >
      {gradient && (
        <div
          className={cn(
            "absolute inset-0 opacity-[0.04]",
            gradient === "primary" && "gradient-primary",
            gradient === "accent" && "gradient-accent",
            gradient === "warm" && "gradient-warm"
          )}
        />
      )}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p className={cn("mt-1 text-xs font-medium", trend.value >= 0 ? "text-success" : "text-destructive")}>
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn(
          "rounded-lg p-2.5",
          gradient === "primary" && "gradient-primary text-primary-foreground",
          gradient === "accent" && "gradient-accent text-accent-foreground",
          gradient === "warm" && "gradient-warm text-warning-foreground",
          !gradient && "bg-muted text-muted-foreground"
        )}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
