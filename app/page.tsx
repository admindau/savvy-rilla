export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_38%)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Orb Rings */}
      <div className="absolute left-1/2 top-36 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-48 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-60 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 pt-28 pb-24 text-center">
        {/* Label */}
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs uppercase tracking-[0.35em] text-white/55 backdrop-blur-xl">
          Savvy Rilla Technologies
        </div>

        {/* Hero */}
        <div className="mt-14">
          <h1 className="text-6xl font-black leading-[0.82] tracking-[-0.08em] sm:text-8xl lg:text-[10rem]">
            COMING
            <span className="block bg-gradient-to-b from-white via-white/55 to-white/5 bg-clip-text text-transparent">
              SOON
            </span>
          </h1>

          <p className="mx-auto mt-12 max-w-3xl text-base leading-9 text-white/60 sm:text-lg">
            We are rebuilding our digital home into a sharper, faster, and more
            intelligent technology experience for modern platforms, automation,
            and African innovation.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-24 grid w-full max-w-6xl gap-6 md:grid-cols-3">
          {[
            [
              "01",
              "Intelligent Systems",
              "Automation, AI-assisted workflows, and modern digital infrastructure.",
            ],
            [
              "02",
              "Enterprise Platforms",
              "Secure, scalable, and reliable systems built for serious operations.",
            ],
            [
              "03",
              "African Innovation",
              "Technology shaped by local context and designed for global ambition.",
            ],
          ].map(([number, title, desc]) => (
            <div
              key={title}
              className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-8 text-left shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="mb-10 text-xs font-semibold tracking-[0.35em] text-white/20">
                {number}
              </div>

              <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-white/85">
                {title}
              </h2>

              <p className="mt-5 text-sm leading-8 text-white/50">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24">
          <a
            href="mailto:hello@savvyrilla.tech"
            className="inline-flex rounded-full bg-white px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_45px_rgba(255,255,255,0.16)] transition hover:scale-105 hover:bg-white/90"
          >
            Contact Us
          </a>

          <div className="mt-8 text-xs uppercase tracking-[0.4em] text-white/30">
            Launching Soon
          </div>
        </div>
      </section>
    </main>
  );
}