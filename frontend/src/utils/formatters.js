import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/** 12345 -> "12.3K", 1234567 -> "1.2M" */
export const formatCount = (num = 0) => {
  const n = Number(num) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${n}`;
};

export const formatViews = (num = 0) => {
  const n = Number(num) || 0;
  return `${formatCount(n)} view${n === 1 ? "" : "s"}`;
};

/** seconds -> "4:33" / "1:02:45" */
export const formatDuration = (seconds = 0) => {
  const total = Math.max(0, Math.floor(Number(seconds) || 0));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (v) => String(v).padStart(2, "0");
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
};

/**
 * The dashboard "channel videos" endpoint returns createdAt as a
 * $dateToParts object ({ year, month, day, ... }) rather than an ISO
 * string. Normalize either shape into something dayjs can parse.
 */
const normalizeDate = (date) => {
  if (date && typeof date === "object" && "year" in date) {
    return new Date(date.year, (date.month || 1) - 1, date.day || 1);
  }
  return date;
};

/** ISO date -> "3 hours ago" */
export const timeAgo = (date) => {
  if (!date) return "";
  return dayjs(normalizeDate(date)).fromNow();
};

export const formatFullDate = (date) => {
  if (!date) return "";
  return dayjs(normalizeDate(date)).format("MMM D, YYYY");
};
