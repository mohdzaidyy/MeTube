import Spinner from "./Spinner";

export default function LoadMoreButton({ onClick, isLoading, hasMore }) {
  if (!hasMore) return null;
  return (
    <div className="flex justify-center py-8">
      <button onClick={onClick} disabled={isLoading} className="btn-secondary min-w-32">
        {isLoading ? <Spinner size={16} /> : "Load more"}
      </button>
    </div>
  );
}
