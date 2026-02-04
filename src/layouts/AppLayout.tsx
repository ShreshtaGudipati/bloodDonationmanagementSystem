
import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import Footer from "@/components/navigation/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const AppLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blood-red animate-spin" />
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        sidebarOpen={sidebarOpen}
        user={user}
      />
      
      <div className="flex flex-1">
        {sidebarOpen && <Sidebar user={user} />}
        
        <main className={`flex-1 p-4 ${!sidebarOpen ? 'ml-0' : ''} transition-all duration-300`}>
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default AppLayout;
