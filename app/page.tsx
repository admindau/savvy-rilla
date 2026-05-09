export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_34%)]" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="absolute left-1/2 top-32 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-40 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="mb-8 inline-flex rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 text-xs uppercase tracking-[0.32em] text-white/60 backdrop-blur-xl">
            Savvy Rilla Technologies
          </div>

          <h1 className="text-6xl font-black leading-[0.82] tracking-[-0.07em] sm:text-8xl lg:text-[9.5rem]">
            COMING
            <span className="mt-2 block bg-gradient-to-b from-white/50 to-white/5 bg-clip-text text-transparent">
              SOON
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            We are rebuilding our digital home into a sharper, faster, and more
            intelligent technology experience for modern platforms, automation,
            and African innovation.
          </p>
        </div>

        <div className="mt-14 grid w-full max-w-5xl gap-4 md:grid-cols-3">
          {[
            [
              "01",
              "AI & Automation",
              "Smart workflows, digital intelligence, and future-ready business systems.",
            ],
            [
              "02",
              "Enterprise Platforms",
              "Secure, scalable, and reliable platforms built for serious operations.",
            ],
            [
              "03",
              "African Innovation",
              "Technology designed with local context, global ambition, and modern execution.",
            ],
          ].map(([number, title, desc]) => (
            <div
              key={title}
              className="rounded-[2rem] border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="mb-6 text-xs font-semibold tracking-[0.3em] text-white/25">
                {number}
              </div>

              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
                {title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/55">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
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
      </section>
    </main>
  );
}