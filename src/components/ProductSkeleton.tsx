export default function ProductSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3"
        >
          <div className="skeleton h-10 w-10 rounded-full" />
          <div className="skeleton h-5 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
          <div className="flex justify-between items-end pt-2">
            <div className="space-y-1">
              <div className="skeleton h-3 w-16" />
              <div className="skeleton h-6 w-24" />
            </div>
            <div className="skeleton h-6 w-14 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
