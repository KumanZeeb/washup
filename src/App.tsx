import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Layouts
import CustomerLayout from "@/components/layouts/CustomerLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import CourierLayout from "@/components/layouts/CourierLayout";

// Auth
import LoginPage from "@/pages/auth/LoginPage";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";

// Customer
import CustomerHome from "@/pages/customer/CustomerHome";
import CustomerOrders from "@/pages/customer/CustomerOrders";
import OrderTracking from "@/pages/customer/OrderTracking";
import CreateOrder from "@/pages/customer/CreateOrder";
import WalletPage from "@/pages/customer/WalletPage";
import PromosPage from "@/pages/customer/PromosPage";
import ProfilePage from "@/pages/customer/ProfilePage";

// Admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminCouriers from "@/pages/admin/AdminCouriers";
import AdminServices from "@/pages/admin/AdminServices";
import AdminPromos from "@/pages/admin/AdminPromos";
import AdminReports from "@/pages/admin/AdminReports";
import AdminLaundryProcess from "@/pages/admin/AdminLaundryProcess";

// Courier
import CourierTasks from "@/pages/courier/CourierTasks";
import CourierTaskDetail from "@/pages/courier/CourierTaskDetail";
import CourierEarnings from "@/pages/courier/CourierEarnings";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Customer */}
            <Route path="/customer" element={<ProtectedRoute roles={["customer"]}><CustomerLayout /></ProtectedRoute>}>
              <Route index element={<CustomerHome />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="orders/:id" element={<OrderTracking />} />
              <Route path="order/create" element={<CreateOrder />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="promos" element={<PromosPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="laundry" element={<AdminLaundryProcess />} />
              <Route path="couriers" element={<AdminCouriers />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="promos" element={<AdminPromos />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>

            {/* Courier */}
            <Route path="/courier" element={<ProtectedRoute roles={["courier"]}><CourierLayout /></ProtectedRoute>}>
              <Route index element={<CourierTasks />} />
              <Route path="task/:id" element={<CourierTaskDetail />} />
              <Route path="earnings" element={<CourierEarnings />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
