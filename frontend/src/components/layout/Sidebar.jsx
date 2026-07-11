import { NavLink } from "react-router-dom";
import {
  Home,
  ThumbsUp,
  History,
  Video,
  FolderOpen,
  Users,
  HelpCircle,
  Settings,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useAuth } from "../../context/AuthContext";

const primaryLinks = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/liked-videos", label: "Liked Videos", icon: ThumbsUp, protected: true },
  { to: "/history", label: "History", icon: History, protected: true },
  { to: "/dashboard", label: "My Content", icon: Video, protected: true },
  { to: "/collections", label: "Collections", icon: FolderOpen, protected: true },
  { to: "/subscribers", label: "Subscribers", icon: Users, protected: true },
];

const secondaryLinks = [
  { to: "/support", label: "Support", icon: HelpCircle },
  { to: "/settings", label: "Settings", icon: Settings, protected: true },
];

function NavItem({ to, label, icon: Icon, end, onNavigate, requiresAuth }) {
  const { isAuthenticated } = useAuth();
  const redirectsToLogin = requiresAuth && !isAuthenticated;
  const target = redirectsToLogin ? "/login" : to;

  return (
    <NavLink
      to={target}
      end={end}
      onClick={onNavigate}
      state={redirectsToLogin ? { from: to } : undefined}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive && !redirectsToLogin
            ? "bg-brand-500/15 text-brand-400"
            : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
        )
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}

export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4 overflow-y-auto px-3 py-4">
      <nav className="flex flex-col gap-1">
        {primaryLinks.map((link) => (
          <NavItem key={link.to} {...link} requiresAuth={link.protected} onNavigate={onNavigate} />
        ))}
      </nav>

      <nav className="flex flex-col gap-1 border-t border-base-border pt-3">
        {secondaryLinks.map((link) => (
          <NavItem key={link.to} {...link} requiresAuth={link.protected} onNavigate={onNavigate} />
        ))}
      </nav>
    </div>
  );
}
