import { Play } from "lucide-react";

const RECENT_VIDEOS = [
  {
    id: "VHItIc1APbM", // Replace with your YouTube Video ID
    title: "How to BEFF in GTA Online 2026 – Complete Beginner Tutorial",
  },
  {
    id: "iKPDqBtWV-k",
    title: "DMO LITE WORKAROUND! HIT IT 100%",
  },
  {
    id: "93s9Xr9Pt4c",
    title: "Free Alternative to Save Wizard Exposed",
  },
];

export default function FeaturedVideos() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      <h2 className="text-accent text-xs tracking-[0.3em] uppercase mb-8 border-l-2 border-accent pl-4 font-semibold">
        Featured Videos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {RECENT_VIDEOS.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-video border border-border-subtle bg-panel/40 overflow-hidden transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              {/* YouTube Thumbnail Image */}
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              />

              {/* The Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-accent/40 flex items-center justify-center bg-bg/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/10">
                  <Play
                    size={24}
                    className="text-accent fill-accent/0 transition-all duration-300 group-hover:fill-accent"
                  />
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-[1px] bg-accent/30 translate-x-4 group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>

            {/* Label Text below the image */}
            <div className="mt-4 text-center">
              <p className="text-[10px] tracking-[0.2em] text-accent/60 uppercase group-hover:text-accent transition-colors">
                {video.title}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
