import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props { children: React.ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-6">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
          <p className="text-muted-foreground text-sm mb-4 max-w-md">
            {this.state.error?.message || "Sesuatu tidak beres. Silakan coba lagi."}
          </p>
          <Button onClick={() => window.location.reload()}>Muat Ulang</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
