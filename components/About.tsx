import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      data-nav-section="about"
      className="relative scroll-mt-24 overflow-hidden py-20"
    >
      <Image src="/aboutbg.png" alt="" fill priority className="object-cover" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="group overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <Image
            src="/about1.png"
            alt="Eco Wellness Spa treatment room"
            width={754}
            height={421}
            className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl">
            Care that is planned before it is given.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base">
            Classical Ayurveda and contemporary therapeutic massage,
            practised in one place on Emmanuel Road, Kathrikadavu. Every
            visit opens with a conversation, every Ayurvedic guest is seen by
            a qualified doctor, and every treatment is matched to the person
            receiving it. Private rooms, fresh linen, warmed oils, senior
            therapists.
          </p>
        </div>
      </div>
    </section>
  );
}
