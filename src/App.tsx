
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Main layouts
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import HomePage from "./pages/Index";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import RequestBloodPage from "./pages/RequestBlood";
import DashboardPage from "./pages/Dashboard";
import EligibilityPage from "./pages/Eligibility";
import GuidelinesPage from "./pages/Guidelines";
import BloodBanksPage from "./pages/BloodBanks";
import RewardsPage from "./pages/Rewards";
import ChatSupportPage from "./pages/ChatSupport";
import AdminDashboardPage from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 10 seconds
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            
            {/* Protected app routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/request" element={<RequestBloodPage />} />
              <Route path="/eligibility" element={<EligibilityPage />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />
              <Route path="/blood-banks" element={<BloodBanksPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/chat-support" element={<ChatSupportPage />} />
            </Route>
            
            {/* Admin routes */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/*" element={<AdminDashboardPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
