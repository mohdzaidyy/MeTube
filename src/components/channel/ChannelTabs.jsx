import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

const tabs = [
  { to: "", label: "Videos", end: true },
  { to: "playlist", label: "Playlist" },
  { to: "tweets", label: "Tweets" },
  { to: "subscribed", label: "Subscribed" },
];

export default function ChannelTabs() {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-base-border px-4 sm:px-6">
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            cn(
              "shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-500 text-brand-400"
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            )
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
