import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Send } from "lucide-react";
import { getVideoComments, addComment } from "../../api/commentApi";
import { getErrorMessage } from "../../api/axiosClient";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../common/Avatar";
import EmptyState from "../common/EmptyState";
import LoadMoreButton from "../common/LoadMoreButton";
import CommentItem from "./CommentItem";
import Spinner from "../common/Spinner";

export default function CommentSection({ videoId }) {
  const { user, isAuthenticated } = useAuth();
  const [draft, setDraft] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const fetchPage = useCallback(
    (page) => getVideoComments(videoId, { page, limit: 10 }),
    [videoId]
  );

  const { docs, setDocs, isLoading, isLoadingMore, hasMore, loadMore } = usePaginatedFetch(
    fetchPage,
    [videoId]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setIsPosting(true);
    try {
      const { data } = await addComment(videoId, trimmed);
      const newComment = {
        ...data.data,
        owner: { _id: user?._id, username: user?.username, avatar: user?.avatar },
        likesCount: 0,
        isLiked: false,
      };
      setDocs((prev) => [newComment, ...prev]);
      setDraft("");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsPosting(false);
    }
  };

  const handleUpdated = (id, content) => {
    setDocs((prev) => prev.map((c) => (c._id === id ? { ...c, content } : c)));
  };

  const handleDeleted = (id) => {
    setDocs((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <div>
      <h2 className="mb-4 font-display text-base font-semibold text-zinc-100">
        {docs.length > 0 ? `${docs.length}+ Comments` : "Comments"}
      </h2>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
          <Avatar src={user?.avatar} name={user?.fullname || user?.username} size="sm" />
          <div className="flex flex-1 items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a comment"
              rows={1}
              className="input-field resize-none"
            />
            <button type="submit" disabled={isPosting || !draft.trim()} className="btn-primary shrink-0">
              {isPosting ? <Spinner size={14} /> : <Send size={15} />}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size={24} />
        </div>
      ) : docs.length === 0 ? (
        <EmptyState icon={MessageSquare} title="No comments yet" description="Be the first to share what you think." />
      ) : (
        <div className="space-y-5">
          {docs.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            />
          ))}
        </div>
      )}

      <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} hasMore={hasMore} />
    </div>
  );
}
