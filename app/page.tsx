export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.13),transparent_38%)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "82px 82px",
        }}
      />

      {/* Fine noise/scan effect */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 5px)",
        }}
      />

      {/* Orbital rings */}
      <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />

      {/* Ring markers */}
      <div className="absolute left-1/2 top-[calc(50%-380px)] h-2 w-2 -translate-x-1/2 rounded-full bg-white/55 shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
      <div className="absolute left-[calc(50%-380px)] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/45" />
      <div className="absolute left-[calc(50%+380px)] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/45" />
      <div className="absolute left-1/2 top-[calc(50%+380px)] h-2 w-2 -translate-x-1/2 rounded-full bg-white/45" />

      {/* Content */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto mb-8 w-fit rounded-full border border-white/15 bg-black/50 px-6 py-2 text-xs uppercase tracking-[0.42em] text-white/62 shadow-[0_0_35px_rgba(255,255,255,0.08)] backdrop-blur-xl">
          Savvy Rilla Technologies
        </div>

        <h1 className="text-6xl font-black leading-[0.88] tracking-[-0.07em] sm:text-8xl lg:text-[10rem]">
          <span className="block text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.28)]">
            COMING
          </span>
          <span className="block bg-gradient-to-b from-white via-white/70 to-white/10 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,255,255,0.18)]">
            SOON
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          A new digital experience is currently under construction.
        </p>

        <div className="relative mx-auto mt-10 h-px w-96 max-w-full bg-gradient-to-r from-transparent via-white/45 to-transparent">
          <div className="absolute left-1/2 top-1/2 h-4 w-28 -translate-x-1/2 -translate-y-1/2 bg-white/30 blur-xl" />
        </div>

        <div className="mt-8">
          <a
            href="mailto:hello@savvyrilla.tech"
            className="group relative inline-flex min-w-80 items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-black/70 px-8 py-5 shadow-[0_0_45px_rgba(255,255,255,0.13)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.08]"
          >
            <span className="mr-7 text-2xl text-white/90 transition duration-300 group-hover:translate-x-1">
              →
            </span>

            <span className="h-8 w-px bg-white/20" />

            <span className="ml-7 text-sm font-bold uppercase tracking-[0.45em] text-white">
              Contact Us
            </span>

            <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <span className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </a>
        </div>
      </section>
    </main>
  );
}