import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Menu, LogOut, LayoutDashboard, UserCircle, Settings as SettingsIcon } from "lucide-react";
import Logo from "../common/Logo";
import Avatar from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Header({ onMenuClick }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to log out");
    }
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-base-border bg-base/95 px-3 backdrop-blur sm:px-4">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-zinc-300 hover:bg-white/5 md:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      <Logo className="hidden sm:flex" />
      <Logo iconOnly className="flex sm:hidden" />

      <form onSubmit={handleSearch} className="mx-auto flex w-full max-w-xl flex-1">
        <div className="relative w-full">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search videos"
            className="input-field pl-9"
          />
        </div>
      </form>

      {isAuthenticated ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center rounded-full ring-offset-2 ring-offset-base focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Account menu"
          >
            <Avatar src={user?.avatar} name={user?.fullname || user?.username} size="sm" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-56 animate-scale-in overflow-hidden rounded-xl border border-base-border bg-base-surface shadow-2xl">
              <div className="border-b border-base-border px-4 py-3">
                <p className="truncate text-sm font-medium text-zinc-100">
                  {user?.fullname || user?.username}
                </p>
                <p className="truncate text-xs text-zinc-500">@{user?.username}</p>
              </div>
              <nav className="py-1.5 text-sm">
                <Link
                  to={`/channel/${user?.username}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-zinc-300 hover:bg-white/5"
                >
                  <UserCircle size={16} /> Your channel
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-zinc-300 hover:bg-white/5"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-zinc-300 hover:bg-white/5"
                >
                  <SettingsIcon size={16} /> Settings
                </Link>
              </nav>
              <div className="border-t border-base-border py-1.5">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-white/5"
                >
                  <LogOut size={16} /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-2">
          <Link to="/login" className="btn-ghost !px-3">
            Log in
          </Link>
          <Link to="/register" className="btn-primary !px-3">
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
}
