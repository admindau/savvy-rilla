// app/page.tsx

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Sparkles,
  Globe,
  ShieldCheck,
} from "lucide-react";

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute left-1/2 top-[-120px] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-100px] h-[350px] w-[350px] rounded-full bg-white/5 blur-3xl" />

      {/* Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          }}
        />
      </div>

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md">
            <Clock3 className="h-4 w-4" />
            Rebuilding Something Exceptional
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-7xl md:text-8xl">
            <span className="block text-white">COMING</span>
            <span className="block text-white/40">SOON</span>
          </h1>

          {/* Divider */}
          <div className="mx-auto my-8 h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Description */}
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg md:text-xl">
            A new digital experience is currently under construction.
            We are redesigning and engineering the next evolution of the
            platform with a sharper vision, stronger infrastructure,
            and a more intelligent experience.
          </p>

          {/* Feature Cards */}
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
              <Sparkles className="mx-auto mb-4 h-6 w-6 text-white/80" />
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Modern Design
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                Refined visuals, immersive interactions, and a futuristic user
                experience.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
              <Globe className="mx-auto mb-4 h-6 w-6 text-white/80" />
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Global Reach
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                Built with scalability, speed, and worldwide accessibility in
                mind.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
              <ShieldCheck className="mx-auto mb-4 h-6 w-6 text-white/80" />
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Enterprise Ready
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                Stronger systems, reliable infrastructure, and production-grade
                performance.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="mailto:hello@savvygorilla.tech"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02] hover:bg-white/90"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>

            <div className="text-sm text-white/40">
              Launching Soon • Stay Tuned
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.25em] text-white/30">
            Savvy Gorilla Technologies
          </div>
        </div>
      </section>
    </main>
  );
}