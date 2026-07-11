/**
 * Different endpoints project avatar/thumbnail fields differently —
 * sometimes as a plain URL string, sometimes as { url, public_id }.
 * These helpers normalize either shape into a usable URL (or undefined).
 */
export const resolveMediaUrl = (field) => {
  if (!field) return undefined;
  if (typeof field === "string") return field;
  if (typeof field === "object" && field.url) return field.url;
  return undefined;
};

export const getInitials = (name = "") => {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};
