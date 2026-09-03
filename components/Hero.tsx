import Image from "next/image";
import FadeReveal from "./FadeReveal";
import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section
      id="home"
      data-nav-section="home"
      className="relative w-full scroll-mt-24 overflow-hidden bg-black"
    >
      <Image
        src="/herobg.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 pt-28 md:px-8">
        <div className="flex flex-1 flex-col items-center gap-10 pb-16 md:flex-row md:items-center md:justify-between md:gap-12">
          <FadeReveal>
            <div className="max-w-[540px] text-center md:text-left">
              <h1 className="text-[34px] font-semibold leading-tight text-white md:text-[44px]">
                At Eco Wellness Spa,
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-[15px]">
                Life moves fast, and your body and mind often carry more than
                they should. In a world of constant rushing, hustling, and
                everyday demands, we all need a moment to pause, heal, and
                rejuvenate. At Eco Wellness Spa, we&apos;re here to take that
                weight off. Our treatments are thoughtfully designed to ease
                stress, relieve muscle tension, improve circulation, and help
                restore your body and mind. With world-class facilities,
                exceptional hygiene, experienced experts, and personalized
                care, we create a space where you can truly relax and give
                your mind and body what they deserve.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                <a
                  href="#book"
                  className="flex min-h-11 min-w-[134px] items-center justify-center rounded-md bg-gradient-to-b from-[#ffd986] to-[#f1bf61] px-12 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,217,134,0.4)] active:scale-95"
                >
                  Book Now
                </a>
                <a
                  href="#contact"
                  className="flex min-h-11 min-w-[116px] items-center justify-center rounded-md border border-white/60 bg-[#3a2517]/45 px-12 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
                >
                  Call us
                </a>
              </div>
            </div>
          </FadeReveal>

          <FadeReveal delay={0.2} className="w-full max-w-sm">
            <div
              id="book"
              className="w-full scroll-mt-28 rounded-xl border border-white/10 bg-[#2a1c12]/70 p-8 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <h2 className="text-2xl font-semibold leading-snug text-white">
                Expert Care.
                <br />
                Exceptional Comfort
              </h2>
              <p className="mt-3 text-sm text-white/70">
                Ready to unwind? Share your details and we&apos;ll be in touch
                within 24 hours.
              </p>

              <LeadForm />
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
}
