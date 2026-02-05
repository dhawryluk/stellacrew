import {
    MessageSquare,
    ShieldCheck,
    ChevronRight,
    Activity,
} from "lucide-react";

export default function DiscordInvite() {
    const systemLogs = [
    { time: "18:32:01", event: "NEW_MEMBER_AUTHORIZED", user: "X_GHOST_X" },
    { time: "18:34:15", event: "LINK_SYNC_COMPLETED", user: "SYSTEM" },
    { time: "18:35:02", event: "JOB_PLAYLIST_UPDATED", user: "MOD_PROTO" },
    { time: "18:38:44", event: "ENCRYPTION_KEY_ROTATED", user: "ADMIN" },
  ];

    return (
        <div className="max-w-7xl mx-auto px-4 mb-4">
      {" "}
      <div className="relative group overflow-hidden bg-bg border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>

        <div className="relative border border-white/10 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-accent p-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <MessageSquare size={24} className="text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-accent text-[9px] font-black uppercase tracking-[0.5em] block mb-1">
                  Network Expansion
                </span>
                <h2 className="text-white text-3xl font-black uppercase tracking-tighter italic">
                  Join the <span className="text-accent">Inner Circle</span>
                </h2>
              </div>
            </div>

            <p className="text-gray-400 text-sm uppercase tracking-widest leading-relaxed max-w-xl">
              Access real-time{" "}
              <span className="text-white font-bold">Modding Intel</span>,
              exclusive
              <span className="text-white font-bold"> Job Playlists</span>, and
              direct support. Encryption keys are waiting.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">
                  Live: 3,600+ Members
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border border-white/5">
                <ShieldCheck size={12} className="text-accent" />
                <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">
                  Verified Status
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-64 bg-black/40 border border-white/5 p-4 font-mono">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={10} className="text-accent" />
              <span className="text-[12px] text-accent font-black uppercase tracking-widest">
                System Logs
              </span>
            </div>
            <div className="space-y-1.5 opacity-60">
              {systemLogs.map((log, i) => (
                <div key={i} className="text-[12px] leading-tight">
                  <span className="text-accent mr-2">{log.event}</span>
                  <span className="text-gray-500 truncate block">
                    {log.user}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <a
              href="https://discord.gg/YmJfjRjvQw"
              target="_blank"
              rel="noreferrer"
              className="relative flex items-center justify-between gap-10 bg-accent hover:bg-white text-black px-12 py-7 transition-all duration-500 group/btn shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            >
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-70">
                  Initialize
                </span>
                <span className="text-xl font-black uppercase tracking-tighter">
                  Enter Discord
                </span>
              </div>
              <ChevronRight
                size={28}
                className="group-hover/btn:translate-x-3 transition-transform duration-500"
              />
            </a>
          </div>
        </div>

        {/* Decorative Side Borders */}
        <div className="absolute top-0 left-0 w-0.5 h-full bg-linear-to-b from-accent via-transparent to-accent opacity-30"></div>
        <div className="absolute top-0 right-0 w-0.5 h-full bg-linear-to-b from-accent via-transparent to-accent opacity-30"></div>
      </div>
    </div>
  );
};
