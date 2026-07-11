import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users } from "lucide-react";
import { getUserChannelSubscribers } from "../api/subscriptionApi";
import { getErrorMessage } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/common/Avatar";
import EmptyState from "../components/common/EmptyState";
import Spinner from "../components/common/Spinner";
import { formatCount } from "../utils/formatters";
import { Link } from "react-router-dom";

export default function Subscribers() {
  const { user } = useAuth();
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    setIsLoading(true);
    getUserChannelSubscribers(user._id)
      .then(({ data }) => setSubscribers((data.data || []).map((row) => row.subscriber)))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [user?._id]);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-5 font-display text-xl font-bold text-zinc-100">Subscribers</h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size={24} />
        </div>
      ) : subscribers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No subscribers yet"
          description="People who subscribe to your channel will show up here."
        />
      ) : (
        <div className="divide-y divide-base-border rounded-xl border border-base-border bg-base-surface">
          {subscribers.map((s) => (
            <div key={s._id} className="flex items-center justify-between gap-3 p-4">
              <Link to={`/channel/${s.username}`} className="flex min-w-0 items-center gap-3">
                <Avatar src={s.avatar} name={s.fullName || s.username} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-100">
                    {s.fullName || s.username}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    {formatCount(s.subscribersCount)} subscribers
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
