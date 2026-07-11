import { useCallback, useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { getUserChannelProfile } from "../../api/userApi";
import { getErrorMessage } from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import { FullPageSpinner } from "../../components/common/Spinner";
import ChannelHeader from "../../components/channel/ChannelHeader";
import ChannelTabs from "../../components/channel/ChannelTabs";
import UploadVideoModal from "../../components/video/UploadVideoModal";

export default function ChannelLayout() {
  const { username } = useParams();
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const isOwner = Boolean(user && channel && user.username === channel.username);

  const loadChannel = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getUserChannelProfile(username);
      if (!data.data) {
        setError("This channel doesn't exist.");
        setChannel(null);
      } else {
        setChannel(data.data);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadChannel();
  }, [loadChannel]);

  if (isLoading) return <FullPageSpinner />;

  if (error || !channel) {
    return (
      <div className="p-6">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error || "Channel not found."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <ChannelHeader channel={channel} isOwner={isOwner} onUpload={() => setUploadOpen(true)} />
      <ChannelTabs />
      <div className="px-4 py-5 sm:px-6">
        <Outlet context={{ channel, isOwner, refreshChannel: loadChannel }} />
      </div>

      <UploadVideoModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUploaded={() => setUploadOpen(false)}
      />
    </div>
  );
}
