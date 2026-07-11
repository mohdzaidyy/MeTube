import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import { MessageCircle, Send } from "lucide-react";
import { getUserTweets, createTweet } from "../../api/tweetApi";
import { getErrorMessage } from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/common/Avatar";
import EmptyState from "../../components/common/EmptyState";
import Spinner from "../../components/common/Spinner";
import TweetItem from "../../components/tweet/TweetItem";

export default function ChannelTweets() {
  const { channel, isOwner } = useOutletContext();
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserTweets(channel._id)
      .then(({ data }) => setTweets(data.data || []))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [channel._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setIsPosting(true);
    try {
      const { data } = await createTweet(trimmed);
      setTweets((prev) => [
        {
          ...data.data,
          ownerDetails: { _id: user?._id, username: user?.username, avatar: user?.avatar },
          likesCount: 0,
          isLiked: false,
        },
        ...prev,
      ]);
      setDraft("");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      {isOwner && (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-3 rounded-xl border border-base-border bg-base-surface p-3">
          <Avatar src={user?.avatar} name={user?.fullname || user?.username} size="sm" />
          <div className="flex flex-1 items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a tweet"
              rows={1}
              className="input-field resize-none border-none bg-transparent px-0 focus:ring-0"
            />
            <button type="submit" disabled={isPosting || !draft.trim()} className="btn-primary shrink-0">
              {isPosting ? <Spinner size={14} /> : <Send size={15} />}
              Send
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size={22} />
        </div>
      ) : tweets.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title="No Tweets"
          description="This channel has yet to make a Tweet."
        />
      ) : (
        <div>
          {tweets.map((tweet) => (
            <TweetItem
              key={tweet._id}
              tweet={tweet}
              onUpdated={(id, content) =>
                setTweets((prev) => prev.map((t) => (t._id === id ? { ...t, content } : t)))
              }
              onDeleted={(id) => setTweets((prev) => prev.filter((t) => t._id !== id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
