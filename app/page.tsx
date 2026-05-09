export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)]" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute left-1/2 top-20 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/60 backdrop-blur-xl">
            Savvy Rilla Technologies
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">
            COMING
            <span className="block text-white/30">SOON</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">
            We are engineering a next-generation digital experience —
            intelligent platforms, futuristic systems, and modern African
            technology solutions.
          </p>

          {/* Divider */}
          <div className="mx-auto my-10 h-px w-40 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                title: "AI & Automation",
                desc: "Smart digital systems powered by modern intelligence.",
              },
              {
                title: "Enterprise Platforms",
                desc: "Scalable infrastructure designed for serious operations.",
              },
              {
                title: "African Innovation",
                desc: "Technology solutions built for the future of Africa.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="mb-3 text-sm uppercase tracking-[0.2em] text-white/40">
                  {item.title}
                </div>

                <p className="text-sm leading-7 text-white/65">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14">
            <a
              href="mailto:hello@savvyrilla.tech"
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-white/90"
            >
              Contact Us
            </a>
          </div>

          {/* Footer */}
          <div className="mt-20 text-xs uppercase tracking-[0.35em] text-white/25">
            Launching Soon
          </div>
        </div>
      </section>
    </main>
  );
}