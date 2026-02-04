
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Search,
  Droplet,
  Heart,
  HelpCircle,
  Award,
  Map,
  MessageSquare,
  BarChart,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart },
  { name: "Find Donors", href: "/search", icon: Search },
  { name: "Request Blood", href: "/request", icon: Droplet },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Blood Banks", href: "/blood-banks", icon: Map },
  { name: "Eligibility", href: "/eligibility", icon: Heart },
  { name: "Guidelines", href: "/guidelines", icon: HelpCircle },
  { name: "Rewards", href: "/rewards", icon: Award },
  { name: "Chat Support", href: "/chat-support", icon: MessageSquare },
];

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    bloodGroup?: string;
  } | null;
}

const Sidebar = ({ user }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto hidden md:block">
      {user && (
        <div className="px-4 py-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={user.name} />
              <AvatarFallback>{user.name ? getInitials(user.name) : "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              {user.bloodGroup && (
                <Badge variant="outline" className="mt-1 bg-red-100 text-red-800 border-red-200">
                  {user.bloodGroup}
                </Badge>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-600">Donor level</span>
              <span className="text-xs text-gray-500">Silver</span>
            </div>
            <Progress value={65} className="h-1" />
          </div>
        </div>
      )}
      
      <div className="py-4 px-3">
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Main Menu
          </h2>
          <nav className="mt-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-blood-red text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blood-red"
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="px-4 py-2">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex">
                <div className="shrink-0">
                  <Droplet className="h-5 w-5 text-blood-red" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blood-red">Blood Needed</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>A+ (Urgent)</li>
                      <li>O- (Critical)</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <Link
                      to="/request"
                      className="text-sm font-medium text-blood-red hover:text-blood-redDark"
                    >
                      Make a Donation →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-blood-red"
                onClick={() => logout()}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
