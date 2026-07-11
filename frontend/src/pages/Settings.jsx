import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { useAuth } from "../context/AuthContext";
import PersonalInfoTab from "../components/settings/PersonalInfoTab";
import ChannelInfoTab from "../components/settings/ChannelInfoTab";
import ChangePasswordTab from "../components/settings/ChangePasswordTab";

const TABS = [
  { key: "personal", label: "Personal Information" },
  { key: "channel", label: "Channel Information" },
  { key: "password", label: "Change Password" },
];

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-zinc-100">Settings</h1>
        <Link to={`/channel/${user?.username}`} className="btn-secondary">
          View channel
        </Link>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-base-border">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "border-brand-500 text-brand-400"
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6">
        {activeTab === "personal" && <PersonalInfoTab />}
        {activeTab === "channel" && <ChannelInfoTab />}
        {activeTab === "password" && <ChangePasswordTab />}
      </div>
    </div>
  );
}
