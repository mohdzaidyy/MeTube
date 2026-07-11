export function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="aspect-video w-full rounded-xl bg-base-raised" />
      <div className="flex gap-2.5">
        <div className="h-8 w-8 shrink-0 rounded-full bg-base-raised" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-4/5 rounded bg-base-raised" />
          <div className="h-3 w-2/5 rounded bg-base-raised" />
          <div className="h-3 w-1/3 rounded bg-base-raised" />
        </div>
      </div>
    </div>
  );
}

export function VideoListItemSkeleton() {
  return (
    <div className="flex gap-4 p-2 animate-pulse">
      <div className="aspect-video w-40 shrink-0 rounded-lg bg-base-raised sm:w-56" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 w-3/4 rounded bg-base-raised" />
        <div className="h-3 w-1/3 rounded bg-base-raised" />
        <div className="h-3 w-1/4 rounded bg-base-raised" />
      </div>
    </div>
  );
}
