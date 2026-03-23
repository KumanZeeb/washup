import { Skeleton } from "@/components/ui/skeleton";

export function PageLoader() {
  return (
    <div className="space-y-6 p-4 md:p-6 animate-fade-in">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-soft space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}
