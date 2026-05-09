export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="pointer-glow" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.88)_86%)]" />

      <div className="animated-grid absolute inset-0 opacity-[0.045]" />
      <div className="noise-layer absolute inset-0 opacity-[0.04]" />

      <div className="orbit orbit-lg" />
      <div className="orbit orbit-md" />
      <div className="orbit orbit-sm" />

      <div className="ring-dot ring-dot-top" />
      <div className="ring-dot ring-dot-bottom" />
      <div className="ring-dot ring-dot-left" />
      <div className="ring-dot ring-dot-right" />

      <section className="relative z-10 flex w-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 rounded-full border border-white/18 bg-black/55 px-6 py-2 text-xs uppercase tracking-[0.42em] text-white/65 shadow-[0_0_36px_rgba(255,255,255,0.1)] backdrop-blur-xl">
          Savvy Rilla Technologies
        </div>

        <h1 className="hero-title flex flex-col items-center justify-center text-center text-6xl font-black leading-[0.88] tracking-[-0.065em] sm:text-8xl lg:text-[10rem]">
          <span className="hero-shimmer block text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.34)]">
            COMING
          </span>

          <span className="block bg-gradient-to-b from-white via-white/70 to-white/8 bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(255,255,255,0.22)]">
            SOON
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-center text-base leading-8 text-white/68 sm:text-lg">
          A new digital experience is currently under construction.
        </p>

        <div className="relative mt-8 flex w-full justify-center">
          <div className="scanner-line relative h-px w-[34rem] max-w-full bg-gradient-to-r from-transparent via-white/55 to-transparent">
            <div className="absolute left-1/2 top-1/2 h-5 w-44 -translate-x-1/2 -translate-y-1/2 bg-white/35 blur-xl" />
          </div>
        </div>

        <div className="mt-5 flex w-full justify-center">
          <a href="mailto:hello@savvyrilla.tech" className="command-button">
            <span className="mr-8 text-3xl leading-none text-white/95 transition duration-300 group-hover:translate-x-1">
              →
            </span>

            <span className="h-9 w-px bg-white/24" />

            <span className="ml-8 text-sm font-bold uppercase tracking-[0.48em] text-white">
              Contact Us
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}