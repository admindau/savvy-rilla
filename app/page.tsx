export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_38%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.88)_86%)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Rings */}
      <div className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.16]" />

      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.095]" />

      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />

      {/* Ring markers */}
      <div className="absolute left-1/2 top-[calc(50%-380px)] h-2 w-2 -translate-x-1/2 rounded-full bg-white/55" />

      <div className="absolute left-1/2 top-[calc(50%+380px)] h-2 w-2 -translate-x-1/2 rounded-full bg-white/45" />

      <div className="absolute left-[calc(50%-380px)] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/45" />

      <div className="absolute left-[calc(50%+380px)] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/45" />

      {/* Content */}
      <section className="relative z-10 flex w-full flex-col items-center justify-center px-6 text-center">
        {/* Label */}
        <div className="mb-8 rounded-full border border-white/18 bg-black/55 px-6 py-2 text-xs uppercase tracking-[0.42em] text-white/65 shadow-[0_0_36px_rgba(255,255,255,0.1)] backdrop-blur-xl">
          Savvy Rilla Technologies
        </div>

        {/* Hero */}
        <h1 className="flex flex-col items-center justify-center text-center text-6xl font-black leading-[0.88] tracking-[-0.065em] sm:text-8xl lg:text-[10rem]">
          <span className="block text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.34)]">
            COMING
          </span>

          <span className="block bg-gradient-to-b from-white via-white/70 to-white/8 bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(255,255,255,0.22)]">
            SOON
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-center text-base leading-8 text-white/68 sm:text-lg">
          A new digital experience is currently under construction.
        </p>

        {/* Light beam */}
        <div className="relative mt-8 flex w-full justify-center">
          <div className="relative h-px w-[34rem] max-w-full bg-gradient-to-r from-transparent via-white/55 to-transparent">
            <div className="absolute left-1/2 top-1/2 h-5 w-44 -translate-x-1/2 -translate-y-1/2 bg-white/35 blur-xl" />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 flex w-full justify-center">
          <a
            href="mailto:hello@savvyrilla.tech"
            className="group relative inline-flex min-w-[27rem] items-center justify-center overflow-hidden rounded-2xl border border-white/35 bg-black/65 px-10 py-5 shadow-[0_0_70px_rgba(255,255,255,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/55 hover:bg-white/[0.08]"
          >
            <span className="mr-8 text-3xl leading-none text-white/95 transition duration-300 group-hover:translate-x-1">
              →
            </span>

            <span className="h-9 w-px bg-white/24" />

            <span className="ml-8 text-sm font-bold uppercase tracking-[0.48em] text-white">
              Contact Us
            </span>

            <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

            <span className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent" />

            <span className="absolute left-0 top-1/2 h-12 w-px -translate-y-1/2 bg-white/55 blur-[1px]" />

            <span className="absolute right-0 top-1/2 h-12 w-px -translate-y-1/2 bg-white/55 blur-[1px]" />
          </a>
        </div>
      </section>
    </main>
  );
}