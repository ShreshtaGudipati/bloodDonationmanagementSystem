
import { Outlet, Navigate } from "react-router-dom";
import AuthHeader from "@/components/auth/AuthHeader";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: "Already signed in",
        description: "Redirecting you to your dashboard...",
      });
    }
  }, [isAuthenticated, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blood-red animate-spin" />
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthHeader />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      
      <div className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Lifeline Blood Donation System
      </div>
    </div>
  );
};

export default AuthLayout;
