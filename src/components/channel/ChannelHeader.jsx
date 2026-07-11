import { Link } from "react-router-dom";
import { Pencil, Plus } from "lucide-react";
import Avatar from "../common/Avatar";
import SubscribeButton from "./SubscribeButton";
import { resolveMediaUrl } from "../../utils/media";
import { formatCount } from "../../utils/formatters";

export default function ChannelHeader({ channel, isOwner, onUpload }) {
  const coverUrl = resolveMediaUrl(channel.coverImage);

  return (
    <div>
      <div className="h-32 w-full overflow-hidden bg-gradient-to-br from-brand-900 via-base-raised to-base-surface sm:h-48">
        {coverUrl && (
          <img src={coverUrl} alt="" className="h-full w-full object-cover" />
        )}
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4 pt-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="flex items-end gap-4 -mt-12 sm:-mt-10">
          <Avatar
            src={channel.avatar}
            name={channel.fullname || channel.username}
            size="xl"
            className="border-4 border-base shadow-lg"
          />
          <div className="pb-1">
            <h1 className="font-display text-lg font-bold text-zinc-100 sm:text-xl">
              {channel.fullname || channel.username}
            </h1>
            <p className="text-sm text-zinc-500">@{channel.username}</p>
            <p className="text-xs text-zinc-500">
              {formatCount(channel.subscribersCount)} Subscribers ·{" "}
              {formatCount(channel.channelsSubscribedToCount)} Subscribed
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          {isOwner ? (
            <>
              <Link to="/settings" className="btn-secondary">
                <Pencil size={15} /> Edit
              </Link>
              <button onClick={onUpload} className="btn-primary">
                <Plus size={15} /> New video
              </button>
            </>
          ) : (
            <SubscribeButton channelId={channel._id} isSubscribed={channel.isSubscribed} />
          )}
        </div>
      </div>
    </div>
  );
}
