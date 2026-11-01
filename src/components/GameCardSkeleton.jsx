// Kerangka kartu game selama data masih dimuat
export function GameCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/70"
    >
      <div className="aspect-[460/215] bg-stone-800" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-stone-800" />
        <div className="h-12 rounded-xl bg-stone-800" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-9 rounded-lg bg-stone-800" />
          <div className="h-9 rounded-lg bg-stone-800" />
        </div>
      </div>
    </div>
  );
}

export default GameCardSkeleton;
