import Image from "next/image";
import FadeReveal from "./FadeReveal";

const ayurvedicServices = [
  {
    image: "/ser21.png",
    title: "Ayurvedic Doctor Consultation",
    description:
      "Personalized consultation with expert Ayurvedic doctors, combining traditional Ayurvedic knowledge with thoughtful, individualized care.",
  },
  {
    image: "/ser22.png",
    title: "Ayurvedic Therapies",
    description:
      "Embrace nature's healing through nourishing herbal oils and traditional Ayurvedic therapies rooted in centuries of natural care.",
  },
  {
    image: "/ser23.png",
    title: "Ayurvedic Wellness Treatments",
    description:
      "Holistic Ayurvedic treatments guided by authentic traditions, nurturing the body, mind, and spirit through natural care.",
  },
];

export default function AyurvedicServices() {
  return (
    <section
      data-nav-section="services"
      className="relative scroll-mt-24 overflow-hidden py-20"
    >
      <Image src="/ser2bg.webp" alt="" fill priority className="object-cover" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 md:px-8">
        <FadeReveal>
          <h2 className="text-center text-3xl font-medium text-white md:text-4xl">
            Ayurvedic Services
          </h2>
        </FadeReveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {ayurvedicServices.map((service, index) => (
            <FadeReveal key={service.title} delay={index * 0.1}>
              <div className="group cursor-pointer h-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  {service.description}
                </p>
              </div>
            </FadeReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
