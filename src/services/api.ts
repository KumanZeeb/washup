import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 15000,
});

// Request interceptor — attach token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — handle 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Service helpers ──────────────────────────────────
export const authService = {
  requestOtp: (phone: string) => api.post("/auth/otp/request", { phone }),
  verifyOtp: (phone: string, otp: string) => api.post("/auth/otp/verify", { phone, otp }),
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};

export const orderService = {
  list: (params?: Record<string, unknown>) => api.get("/orders", { params }),
  get: (id: string) => api.get(`/orders/${id}`),
  create: (data: Record<string, unknown>) => api.post("/orders", data),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
};

export const laundryProcessService = {
  list: (params?: Record<string, unknown>) => api.get("/laundry-process", { params }),
  get: (id: string) => api.get(`/laundry-process/${id}`),
  updateStatus: (id: string, status: string) => api.patch(`/laundry-process/${id}/status`, { status }),
  uploadProof: (id: string, file: File, note?: string) => {
    const fd = new FormData();
    fd.append("photo", file);
    if (note) fd.append("note", note);
    return api.post(`/laundry-process/${id}/proof`, fd, { headers: { "Content-Type": "multipart/form-data" } });
  },
};

export const serviceService = {
  list: (params?: Record<string, unknown>) => api.get("/services", { params }),
  get: (id: string) => api.get(`/services/${id}`),
  create: (data: Record<string, unknown>) => api.post("/services", data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

export const courierService = {
  tasks: (params?: Record<string, unknown>) => api.get("/courier/tasks", { params }),
  acceptTask: (id: string) => api.post(`/courier/tasks/${id}/accept`),
  rejectTask: (id: string) => api.post(`/courier/tasks/${id}/reject`),
  updateStatus: (id: string, status: string) => api.patch(`/courier/tasks/${id}/status`, { status }),
  uploadProof: (id: string, file: File) => {
    const fd = new FormData();
    fd.append("photo", file);
    return api.post(`/courier/tasks/${id}/proof`, fd, { headers: { "Content-Type": "multipart/form-data" } });
  },
  earnings: () => api.get("/courier/earnings"),
};

export const walletService = {
  balance: () => api.get("/wallet/balance"),
  transactions: (params?: Record<string, unknown>) => api.get("/wallet/transactions", { params }),
};

export const promoService = {
  list: () => api.get("/promos"),
  claim: (code: string) => api.post("/promos/claim", { code }),
  create: (data: Record<string, unknown>) => api.post("/promos", data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/promos/${id}`, data),
  delete: (id: string) => api.delete(`/promos/${id}`),
};

export const reportService = {
  revenue: (params?: Record<string, unknown>) => api.get("/reports/revenue", { params }),
  orders: (params?: Record<string, unknown>) => api.get("/reports/orders", { params }),
  export: (type: string, params?: Record<string, unknown>) =>
    api.get(`/reports/export/${type}`, { params, responseType: "blob" }),
};
