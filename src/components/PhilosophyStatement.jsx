import BackgroundStars from "./BackgroundStars";

export default function PhilosophyStatement() {
  return (
    <section className="relative w-full bg-bg flex justify-center px-6 overflow-hidden pt-12 pb-23">
        <BackgroundStars />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h3 className="text-accent font-bold text-xs md:text-sm tracking-[0.4em] uppercase mb-8 opacity-90 pl-[0.4em]">
                The Gold Standard
            </h3>
          <div className="space-y-8">
            <p className="text-lg md:text-2xl font-light leading-relaxed tracking-wide">
            <span className="font-medium">STELLACREW</span> is the evolution of a legacy.  What began in the spirit of the social club has ascended into the definitive {" "}
            <span className="text-accent font-semibold">Gold Standard</span> of gaming.  We have moved beyond the noise to curate a world of elite aesthetics and unmatched quality for those who demand more than the ordinary. </p>
            <p className="text-text-main/60 text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto">The <span className="text-accent">8-Point Stella Star</span> is our promise—a North Star guiding you toward the peak of the gaming experience.  We provide the edge, the exclusivity, and the prestige required to transform you into the elite signal in the noise.</p>
          </div>
          <div className="mt-16 space-y-4">
          <p className="text-sm md:text-base tracking-[0.2em] font-medium uppercase opacity-70 pl-[0.2em]">We are the architects of excellence.</p>
          <h2 className="text-accent text-4xl md:text-6xl font-bold tracking-[0.25em] uppercase pl-[0.25em]">STELLACREW</h2>
          </div>
        </div>
    </section>
  );
}