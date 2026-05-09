export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_34%)]" />

      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-7 inline-flex rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 text-xs uppercase tracking-[0.32em] text-white/60 shadow-2xl backdrop-blur-xl">
            Savvy Rilla Technologies
          </div>

          <h1 className="mx-auto max-w-5xl text-6xl font-black leading-[0.85] tracking-[-0.08em] sm:text-8xl md:text-[10rem]">
            COMING
            <span className="block bg-gradient-to-b from-white/45 to-white/5 bg-clip-text text-transparent">
              SOON
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            We are rebuilding our digital home into a sharper, faster, and more
            intelligent technology experience for modern platforms, automation,
            and African innovation.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              ["01", "AI & Automation", "Smart workflows, digital intelligence, and future-ready business systems."],
              ["02", "Enterprise Platforms", "Secure, scalable, and reliable platforms built for serious operations."],
              ["03", "African Innovation", "Technology designed with local context, global ambition, and modern execution."],
            ].map(([number, title, desc]) => (
              <div
                key={title}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-left shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="mb-8 text-xs font-semibold tracking-[0.3em] text-white/25">
                  {number}
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/55">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a
              href="mailto:hello@savvyrilla.tech"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.18)] transition hover:scale-105 hover:bg-white/90"
            >
              Contact Us
            </a>

            <span className="text-xs uppercase tracking-[0.35em] text-white/35">
              Launching Soon
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}