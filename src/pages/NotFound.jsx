import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
        <Compass size={26} />
      </div>
      <h1 className="font-display text-2xl font-bold text-zinc-100">404</h1>
      <p className="max-w-sm text-sm text-zinc-500">
        We couldn&apos;t find the page you're looking for. It may have been moved or doesn&apos;t exist.
      </p>
      <Link to="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
