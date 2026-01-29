export default function SkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse glass h-[280px] rounded-2xl flex flex-col p-6 gap-4">
          <div className="flex justify-between">
            <div className="w-12 h-12 bg-white/10 rounded-xl" />
            <div className="w-20 h-6 bg-white/10 rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="mt-auto h-12 w-full bg-white/10 rounded-xl" />
        </div>
      ))}
    </>
  );
}
