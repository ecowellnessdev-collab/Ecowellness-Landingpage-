import Image from "next/image";

const services = [
  {
    icon: "/service1.png",
    title: "Deep Tissue Massage",
    description:
      "A deeply restorative treatment that melts tension, eases soreness, and rejuvenates tired muscles.",
  },
  {
    icon: "/service2.png",
    title: "Swedish Massage",
    description:
      "Experience the classic art of Swedish massage through flowing strokes, rhythmic kneading, and soothing pressure.",
  },
  {
    icon: "/service3.png",
    title: "Aroma Therapy",
    description:
      "A tranquil sensory escape with premium essential oils, designed to soothe the senses and promote deep relaxation.",
  },
  {
    icon: "/service4.png",
    title: "Body Relaxation Therapy",
    description:
      "A restorative experience designed to release everyday strain, refresh your body, and usher in a deeper state of relaxation.",
  },
  {
    icon: "/service5.png",
    title: "Full Body Wellness Massage",
    description:
      "A head-to-toe wellness ritual designed to renew your body, awaken your senses, and enhance your overall vitality.",
  },
  {
    icon: "/service6.png",
    title: "Stress Relief Therapy",
    description:
      "A nurturing escape from daily pressures, designed to quiet the mind and create a lasting sense of serenity.",
  },
  {
    icon: "/service7.png",
    title: "Head, Neck & Shoulder Massage",
    description:
      "Targeted healing for the head, neck, and shoulders, easing built-up strain and bringing comfort to overworked areas.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-nav-section="services"
      className="relative scroll-mt-24 overflow-hidden py-20"
    >
      <Image src="/bgser.png" alt="" fill priority className="object-cover" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 md:px-8">
        <h2 className="text-center text-3xl font-semibold text-[#e6bf6a] md:text-4xl">
          Wellness &amp; Massage Therapies
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative overflow-hidden rounded-3xl p-8 text-center shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffd86d] to-[#787b46] opacity-40" />
              <div className="relative z-10">
                <Image
                  src={service.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="mx-auto h-14 w-14 object-contain"
                />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85">
                  {service.description}
                </p>
              </div>
            </div>
          ))}

          <div className="hidden items-end justify-center lg:col-span-2 lg:flex">
            <Image
              src="/servicebg.png"
              alt=""
              width={1070}
              height={307}
              className="h-auto w-full max-w-[520px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
