import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  MessageSquare,
  ShoppingCart,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors",
        isActive && "bg-gray-100"
      )}
    >
      <div className="text-gray-600">{icon}</div>
      <span className="text-gray-700 font-medium">{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 fixed">
      <div className="mb-8">
        <Logo />
      </div>

      <nav className="space-y-1">
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          href="/dashboard"
          isActive
        />
        <SidebarItem icon={<Package size={20} />} label="Product" href="/" />
        <SidebarItem
          icon={<ClipboardList size={20} />}
          label="Orders"
          href="/"
        />
        <SidebarItem icon={<Users size={20} />} label="Customers" href="/" />
        <SidebarItem
          icon={<MessageSquare size={20} />}
          label="Manage Reviews"
          href="/"
        />
        <SidebarItem
          icon={<ShoppingCart size={20} />}
          label="Checkout"
          href="/"
        />
        <SidebarItem icon={<Settings size={20} />} label="Settings" href="/" />
      </nav>
    </div>
  );
};
