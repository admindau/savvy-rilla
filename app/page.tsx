export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_38%)]" />

      {/* Futuristic Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* Rings */}
      <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      {/* Content */}
      <section className="relative z-10 px-6 text-center">
        <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs uppercase tracking-[0.35em] text-white/55 backdrop-blur-xl">
          Savvy Rilla Technologies
        </div>

        <h1 className="text-6xl font-black leading-[0.85] tracking-[-0.08em] sm:text-8xl lg:text-[10rem]">
          COMING
          <span className="block bg-gradient-to-b from-white via-white/55 to-white/10 bg-clip-text text-transparent">
            SOON
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
          A new digital experience is currently under construction.
        </p>

        <div className="mt-14">
          <a
            href="mailto:hello@savvyrilla.tech"
            className="inline-flex rounded-full border border-white/15 bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_45px_rgba(255,255,255,0.16)] transition duration-300 hover:scale-105 hover:bg-white/90"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}