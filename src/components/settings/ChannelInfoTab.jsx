import { useState } from "react";
import { Info } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ChannelInfoTab() {
  const { user } = useAuth();
  const [description, setDescription] = useState("");

  return (
    <div>
      <h2 className="font-display text-base font-semibold text-zinc-100">Channel Info</h2>
      <p className="mt-1 text-sm text-zinc-500">Update your channel details here.</p>

      <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-brand-500/30 bg-brand-500/10 px-3.5 py-3 text-sm text-brand-200">
        <Info size={16} className="mt-0.5 shrink-0" />
        <p>
          Username and channel description updates aren&apos;t available yet — the current API
          only supports updating your avatar, cover image, name, email and password.
        </p>
      </div>

      <div className="mt-5 max-w-lg space-y-4 opacity-60">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-300">Username</label>
          <input value={user?.username || ""} readOnly disabled className="input-field cursor-not-allowed" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            disabled
            placeholder="Tell viewers about your channel"
            className="input-field cursor-not-allowed"
          />
        </div>
        <div className="flex justify-end">
          <button type="button" disabled className="btn-primary cursor-not-allowed">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
