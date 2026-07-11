import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Users } from "lucide-react";
import { getSubscribedChannels } from "../../api/subscriptionApi";
import { getErrorMessage } from "../../api/axiosClient";
import Avatar from "../../components/common/Avatar";
import EmptyState from "../../components/common/EmptyState";
import Spinner from "../../components/common/Spinner";
import SubscribeButton from "../../components/channel/SubscribeButton";

export default function ChannelSubscribed() {
  const { channel } = useOutletContext();
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getSubscribedChannels(channel._id)
      .then(({ data }) => setChannels((data.data || []).map((row) => row.subscribedChannel)))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [channel._id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size={22} />
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No people subscribers"
        description="This channel has yet to subscribe to a new channel."
      />
    );
  }

  return (
    <div className="divide-y divide-base-border">
      {channels.map((c) => (
        <div key={c._id} className="flex items-center justify-between gap-3 py-3">
          <Link to={`/channel/${c.username}`} className="flex min-w-0 items-center gap-3">
            <Avatar src={c.avatar} name={c.username} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-100">{c.username}</p>
              {c.latestVideo?.title && (
                <p className="truncate text-xs text-zinc-500">Latest: {c.latestVideo.title}</p>
              )}
            </div>
          </Link>
          <SubscribeButton channelId={c._id} className="!py-1.5 !px-3 text-xs" />
        </div>
      ))}
    </div>
  );
}
