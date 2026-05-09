export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_50%_90%,rgba(255,255,255,0.08),transparent_35%)]" />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      <div className="absolute left-1/2 top-[18%] h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-[24%] h-[340px] w-[340px] -translate-x-1/2 rounded-full border border-white/10" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-10 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs uppercase tracking-[0.35em] text-white/55 backdrop-blur-xl">
          Savvy Rilla Technologies
        </div>

        <h1 className="max-w-5xl text-6xl font-black leading-[0.88] tracking-[-0.06em] sm:text-8xl lg:text-[8.8rem]">
          COMING
          <span className="block bg-gradient-to-b from-white via-white/60 to-white/10 bg-clip-text text-transparent">
            SOON
          </span>
        </h1>

        <p className="mx-auto mt-10 max-w-3xl text-base leading-8 text-white/62 sm:text-lg">
          We are rebuilding our digital home into a sharper, faster, and more
          intelligent technology experience for modern platforms, automation,
          and African innovation.
        </p>

        <div className="mt-16 grid w-full max-w-5xl gap-5 md:grid-cols-3">
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
              className="rounded-[2rem] border border-white/10 bg-black/50 p-7 text-left shadow-[0_0_60px_rgba(255,255,255,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.045]"
            >
              <div className="mb-8 text-xs font-semibold tracking-[0.35em] text-white/25">
                {number}
              </div>

              <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-white/85">
                {title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/52">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5">
          <a
            href="mailto:hello@savvyrilla.tech"
            className="rounded-full bg-white px-9 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_45px_rgba(255,255,255,0.18)] transition hover:scale-105 hover:bg-white/90"
          >
            Contact Us
          </a>

          <div className="text-xs uppercase tracking-[0.4em] text-white/30">
            Launching Soon
          </div>
        </div>
      </section>
    </main>
  );
}