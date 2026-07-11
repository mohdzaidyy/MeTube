import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Eye, Users, ThumbsUp, Film } from "lucide-react";
import { getChannelStats, getChannelVideos } from "../api/dashboardApi";
import { getErrorMessage } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import DashboardVideoRow from "../components/video/DashboardVideoRow";
import UploadVideoModal from "../components/video/UploadVideoModal";
import EditVideoModal from "../components/video/EditVideoModal";
import { formatCount } from "../utils/formatters";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl border border-base-border bg-base-surface p-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="font-display text-lg font-bold text-zinc-100">{formatCount(value)}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [statsRes, videosRes] = await Promise.all([getChannelStats(), getChannelVideos()]);
      setStats(statsRes.data.data);
      setVideos(videosRes.data.data || []);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-zinc-100">
            Welcome Back, {user?.fullname || user?.username}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Seamless Video Management, Elevated Results.
          </p>
        </div>
        <button onClick={() => setUploadOpen(true)} className="btn-primary">
          <Plus size={16} /> Upload video
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Eye} label="Total views" value={stats?.totalViews} />
        <StatCard icon={Users} label="Total subscribers" value={stats?.totalSubscribers} />
        <StatCard icon={ThumbsUp} label="Total likes" value={stats?.totalLikes} />
      </div>

      <div className="overflow-hidden rounded-xl border border-base-border bg-base-surface">
        {videos.length === 0 ? (
          <EmptyState
            icon={Film}
            title="No videos uploaded yet"
            description="Upload your first video to start growing your channel."
            action={
              <button onClick={() => setUploadOpen(true)} className="btn-primary">
                <Plus size={15} /> Upload video
              </button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-base-border text-xs uppercase tracking-wide text-zinc-500">
                  <th className="py-3 pl-4 pr-2 font-medium">Status</th>
                  <th className="py-3 pr-2 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Uploaded</th>
                  <th className="py-3 pr-4 font-medium">Rating</th>
                  <th className="py-3 pr-4 font-medium">Date uploaded</th>
                  <th className="py-3 pr-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <DashboardVideoRow
                    key={video._id}
                    video={video}
                    owner={user}
                    onEdit={setEditingVideo}
                    onDeleted={(id) => setVideos((prev) => prev.filter((v) => v._id !== id))}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UploadVideoModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={(video) => {
          setVideos((prev) => [{ ...video, likesCount: 0 }, ...prev]);
          setUploadOpen(false);
        }}
      />

      <EditVideoModal
        isOpen={Boolean(editingVideo)}
        onClose={() => setEditingVideo(null)}
        video={editingVideo}
        onUpdated={(updated) =>
          setVideos((prev) => prev.map((v) => (v._id === updated._id ? { ...v, ...updated } : v)))
        }
      />
    </div>
  );
}
