export default function SystemStatus() {
  return (
  <div className="flex flex-wrap items-center gap-6 mb-12 py-3 border-y border-white/5">
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]">
        Live Feed: Connected
      </span>
    </div>
  </div>
);
}