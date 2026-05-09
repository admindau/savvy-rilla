export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(76,89,255,0.22),transparent_32%),radial-gradient(circle_at_bottom,rgba(0,153,255,0.16),transparent_35%)]" />

      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(110,130,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(110,130,255,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-14 text-center">
        <div className="relative mb-8 flex h-56 w-56 items-center justify-center rounded-full border border-blue-400/40 bg-black/40 shadow-[0_0_80px_rgba(59,130,246,0.35)] backdrop-blur-xl">
          <div className="absolute h-72 w-72 rounded-full border border-blue-400/20" />
          <div className="absolute h-96 w-96 rounded-full border border-purple-400/10" />

          <div className="text-8xl drop-shadow-[0_0_28px_rgba(96,165,250,0.8)]">
            🦍
          </div>
        </div>

        <div className="mb-4 text-xs uppercase tracking-[0.45em] text-blue-200/70">
          Savvy Rilla Technologies
        </div>

        <h1 className="text-6xl font-black leading-[0.85] tracking-[-0.06em] sm:text-8xl lg:text-[9.5rem]">
          COMING
          <span className="block bg-gradient-to-b from-blue-200 via-blue-500 to-purple-700 bg-clip-text text-transparent">
            SOON
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
          We are engineering intelligent digital solutions that empower
          businesses, scale modern platforms, and shape the future of African
          technology.
        </p>

        <div className="mt-12 grid w-full max-w-5xl gap-5 md:grid-cols-3">
          {[
            ["SMART SOLUTIONS", "AI-powered systems built to solve real-world problems."],
            ["SCALABLE PLATFORMS", "Robust, secure, and scalable platforms for serious operations."],
            ["AFRICAN INNOVATION", "Creating technology that drives Africa forward."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-[2rem] border border-blue-300/20 bg-white/[0.035] p-7 shadow-[0_0_40px_rgba(37,99,235,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-blue-500/[0.06]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/30 bg-blue-500/10 text-2xl">
                ✦
              </div>

              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                {title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/55">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-5 text-xs uppercase tracking-[0.4em] text-white/35">
            Stay Connected
          </div>

          <a
            href="mailto:hello@savvyrilla.tech"
            className="inline-flex items-center justify-center rounded-xl border border-blue-300/50 bg-blue-500/10 px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(59,130,246,0.35)] transition hover:scale-105 hover:bg-blue-500/20"
          >
            Contact Us
          </a>
        </div>

        <div className="mt-12 text-xs uppercase tracking-[0.45em] text-white/25">
          Launching Soon
        </div>
      </section>
    </main>
  );
}