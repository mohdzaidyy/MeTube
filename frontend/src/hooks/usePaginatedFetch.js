import { useCallback, useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../api/axiosClient";

/**
 * fetchPage(page) must resolve to an axios response whose `data.data` is a
 * mongoose-aggregate-paginate-v2 result: { docs, hasNextPage, ... }.
 * Re-runs from page 1 whenever `deps` changes.
 */
export default function usePaginatedFetch(fetchPage, deps = []) {
  const [docs, setDocs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const load = useCallback(
    async (pageToLoad, append) => {
      const currentRequest = ++requestId.current;
      append ? setIsLoadingMore(true) : setIsLoading(true);
      setError(null);
      try {
        const res = await fetchPage(pageToLoad);
        if (currentRequest !== requestId.current) return;
        const result = res?.data?.data || {};
        const newDocs = result.docs || [];
        setDocs((prev) => (append ? [...prev, ...newDocs] : newDocs));
        setHasMore(Boolean(result.hasNextPage));
        setPage(pageToLoad);
      } catch (err) {
        if (currentRequest !== requestId.current) return;
        setError(getErrorMessage(err));
      } finally {
        if (currentRequest === requestId.current) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [fetchPage]
  );

  useEffect(() => {
    load(1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const loadMore = () => {
    if (!isLoadingMore && hasMore) load(page + 1, true);
  };

  const refresh = () => load(1, false);

  return { docs, setDocs, isLoading, isLoadingMore, hasMore, loadMore, error, refresh };
}
