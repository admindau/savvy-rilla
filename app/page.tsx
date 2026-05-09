export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_38%)]" />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.82)_82%)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "86px 86px",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 6px)",
        }}
      />

      {/* Orbital rings */}
      <div className="absolute left-1/2 top-1/2 h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" />
      <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]" />

      {/* Ring markers */}
      <div className="absolute left-1/2 top-[calc(50%-430px)] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/45 shadow-[0_0_18px_rgba(255,255,255,0.65)]" />
      <div className="absolute left-[calc(50%-430px)] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/32" />
      <div className="absolute left-[calc(50%+430px)] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/32" />

      {/* Content */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mx-auto mb-10 w-fit rounded-full border border-white/12 bg-black/45 px-6 py-2 text-[11px] uppercase tracking-[0.38em] text-white/55 shadow-[0_0_30px_rgba(255,255,255,0.06)] backdrop-blur-xl">
          Savvy Rilla Technologies
        </div>

        <h1 className="text-6xl font-black leading-[0.94] tracking-[-0.07em] sm:text-8xl lg:text-[9.5rem]">
          <span className="block text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.24)]">
            COMING
          </span>
          <span className="mt-3 block bg-gradient-to-b from-white via-white/72 to-white/12 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(255,255,255,0.14)]">
            SOON
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
          A new digital experience is currently under construction.
        </p>

        <div className="relative mx-auto mt-14 h-px w-[30rem] max-w-full bg-gradient-to-r from-transparent via-white/40 to-transparent">
          <div className="absolute left-1/2 top-1/2 h-5 w-36 -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-xl" />
        </div>

        <div className="mt-10">
          <a
            href="mailto:hello@savvyrilla.tech"
            className="group relative inline-flex min-w-[22rem] items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-white/[0.035] px-8 py-5 shadow-[0_0_55px_rgba(255,255,255,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/45 hover:bg-white/[0.08] hover:shadow-[0_0_75px_rgba(255,255,255,0.18)]"
          >
            <span className="mr-7 text-2xl text-white/90 transition duration-300 group-hover:translate-x-1">
              →
            </span>

            <span className="h-8 w-px bg-white/20" />

            <span className="ml-7 text-sm font-bold uppercase tracking-[0.42em] text-white">
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