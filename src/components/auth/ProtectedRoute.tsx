import { Navigate } from "react-router-dom";
import { useAuthStore, type UserRole } from "@/store/authStore";

interface Props {
  children: React.ReactNode;
  roles?: UserRole[];
}

export function ProtectedRoute({ children, roles }: Props) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
}
