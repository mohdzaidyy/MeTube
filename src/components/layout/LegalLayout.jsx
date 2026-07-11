import { Link, Outlet } from "react-router-dom";
import Logo from "../common/Logo";
import { useAuth } from "../../context/AuthContext";

export default function LegalLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-base">
      <header className="flex h-16 items-center justify-between border-b border-base-border px-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-zinc-400 sm:flex">
          <Link to="/" className="hover:text-zinc-100">Home</Link>
          <Link to="/privacy" className="hover:text-zinc-100">Privacy</Link>
          <Link to="/terms" className="hover:text-zinc-100">Terms</Link>
        </nav>
        {!isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-ghost !px-3">Log in</Link>
            <Link to="/register" className="btn-primary !px-3">Sign up</Link>
          </div>
        ) : (
          <Link to="/" className="btn-secondary !px-3">Back to app</Link>
        )}
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
