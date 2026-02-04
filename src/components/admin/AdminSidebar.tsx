
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Droplet,
  FileText,
  Award,
  MapPin,
  Settings,
  Shield,
  LineChart,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Blood Requests", href: "/admin/requests", icon: Droplet },
  { name: "Donations", href: "/admin/donations", icon: FileText },
  { name: "Blood Banks", href: "/admin/blood-banks", icon: MapPin },
  { name: "Rewards", href: "/admin/rewards", icon: Award },
  { name: "Reports", href: "/admin/reports", icon: LineChart },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Security", href: "/admin/security", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 text-white h-screen overflow-y-auto">
      <div className="px-4 py-6">
        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-6">
          Admin Controls
        </p>
        <nav className="space-y-1">
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
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon
                  className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-gray-400")}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="px-4 py-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-white">System Status</p>
            <div className="flex items-center mt-1">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <p className="ml-2 text-xs text-gray-400">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
