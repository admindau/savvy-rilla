export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_100%,64px_64px,64px_64px]" />

        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.3em] text-white/60 backdrop-blur">
            Savvy Rilla Technologies
          </div>

          <h1 className="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">
            COMING
            <span className="block text-white/35">SOON</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            We are rebuilding our digital home into a sharper, faster, and more
            intelligent experience. Something exceptional is loading.
          </p>

          <div className="mx-auto my-10 h-px w-40 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Modern digital platforms",
              "Enterprise-grade systems",
              "Built for South Sudan",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-white/65 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="mailto:hello@savvygorilla.tech"
              className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
            >
              Contact Us
            </a>
          </div>

          <p className="mt-16 text-xs uppercase tracking-[0.35em] text-white/30">
            Launching Soon
          </p>
        </div>
      </section>
    </main>
  );
}