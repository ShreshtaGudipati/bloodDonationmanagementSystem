
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, Search, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen?: boolean;
  user?: {
    name: string;
    email: string;
    bloodGroup?: string;
  } | null;
}

const Navbar = ({ toggleSidebar, sidebarOpen, user }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and menu toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blood-red p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center ml-4">
              <div className="flex items-center">
                <div className="text-blood-red">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-8 h-8"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">Lifeline</span>
              </div>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-blood-red px-3 py-2 text-sm font-medium">
              Find Donors
            </Link>
            <Link to="/request" className="text-gray-600 hover:text-blood-red px-3 py-2 text-sm font-medium">
              Request Blood
            </Link>
            <Link to="/blood-banks" className="text-gray-600 hover:text-blood-red px-3 py-2 text-sm font-medium">
              Blood Banks
            </Link>
            <Link to="/guidelines" className="text-gray-600 hover:text-blood-red px-3 py-2 text-sm font-medium">
              Guidelines
            </Link>
          </nav>

          {/* Right side - User menu & actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative" asChild>
              <Link to="/search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blood-red" />
              <span className="sr-only">Notifications</span>
            </Button>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards">Rewards</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-100">
            <Link to="/search" className="block py-2 px-4 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blood-red">
              Find Donors
            </Link>
            <Link to="/request" className="block py-2 px-4 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blood-red">
              Request Blood
            </Link>
            <Link to="/blood-banks" className="block py-2 px-4 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blood-red">
              Blood Banks
            </Link>
            <Link to="/guidelines" className="block py-2 px-4 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blood-red">
              Guidelines
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
