import { Mail, MessageSquareText, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How do I upload a video?",
    a: "Go to your channel or the Dashboard page and click \"New video\" / \"Upload video\", then drag in your file, add a thumbnail, title and description.",
  },
  {
    q: "Why is my video not showing up?",
    a: "New uploads are private by default. Publish them from your Dashboard by toggling the Published switch next to the video.",
  },
  {
    q: "How do I reset my password?",
    a: "Head to Settings → Change Password. You'll need your current password to set a new one.",
  },
  {
    q: "Can I save videos for later?",
    a: "Yes — click Save on any video to add it to an existing playlist or create a new one.",
  },
];

export default function Support() {
  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
          <HelpCircle size={20} />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-zinc-100">Support</h1>
          <p className="text-sm text-zinc-500">We're here to help you get the most out of Metube.</p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQS.map((item) => (
          <details key={item.q} className="group card-surface p-4 open:bg-base-raised">
            <summary className="cursor-pointer list-none text-sm font-medium text-zinc-100">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-zinc-500">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-base-border bg-base-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <MessageSquareText size={20} className="text-brand-400" />
          <div>
            <p className="text-sm font-medium text-zinc-100">Still need help?</p>
            <p className="text-xs text-zinc-500">Reach out and we'll get back to you shortly.</p>
          </div>
        </div>
        <a href="mailto:support@metube.app" className="btn-primary">
          <Mail size={15} /> Email support
        </a>
      </div>
    </div>
  );
}
