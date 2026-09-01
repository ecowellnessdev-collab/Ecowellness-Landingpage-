import Image from "next/image";

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    path: "M13.5 9H15V6.5h-1.5C11.6 6.5 10.5 7.6 10.5 9.5V11H9v2.5h1.5V18H13v-4.5h1.9l.4-2.5H13v-1c0-.6.4-1 1-1z",
  },
  {
    name: "Instagram",
    path: "",
  },
  {
    name: "YouTube",
    path: "M9.5 8.5v7l6-3.5-6-3.5z",
  },
  {
    name: "LinkedIn",
    path: "M6 10h2v7H6v-7Zm1-3.3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM11 10h1.9v1.3c.6-.9 1.6-1.5 2.8-1.5 2.1 0 3.3 1.4 3.3 4V17h-2v-3c0-1.4-.5-2.3-1.8-2.3-1 0-1.7.7-1.9 1.3-.1.2-.1.5-.1.8V17h-2v-7Z",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      data-nav-section="contact"
      className="relative scroll-mt-24 bg-[#311602] py-20"
    >
      <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-6 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="text-3xl font-medium leading-snug text-white md:text-4xl">
            Relax. Restore.
            <br />
            Reconnect.
          </h2>
          <p className="mt-4 max-w-sm text-2xl font-normal leading-snug text-[#c9c17a] md:text-3xl">
            A mindful approach to wellness, created to help you feel your
            best.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href="tel:+919496598394"
              className="flex items-center gap-3 text-white transition-colors hover:text-[#e6bf6a]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2Z" />
              </svg>
              <span>+91 94965 98394</span>
            </a>
            <a
              href="mailto:ecowelnessspa@gmail.com"
              className="flex items-center gap-3 text-white transition-colors hover:text-[#e6bf6a]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2.24V6l8 5.99L20 6v.24l-8 5.75-8-5.75ZM4 8.51V18h16V8.51l-7.4 5.34a1 1 0 0 1-1.2 0L4 8.51Z" />
              </svg>
              <span>ecowelnessspa@gmail.com</span>
            </a>
          </div>
        </div>

        <div>
          <Image
            src="/logo-mark.png"
            alt="Eco Wellness Spa"
            width={172}
            height={135}
            className="h-16 w-auto"
          />
          <h3 className="mt-4 text-2xl font-medium text-white">Talk To Us</h3>

          <div className="mt-5 text-sm leading-relaxed">
            <p className="font-semibold tracking-wide text-[#e6bf6a]">
              ECO WELLNESS SPA
            </p>
            <p className="mt-1 text-white/80">Kaloor Kadavanthra</p>
            <p className="text-white/80">Emmanuel Road, Kathrikadav</p>
          </div>

          <div className="mt-6 text-sm leading-relaxed">
            <p className="font-semibold tracking-wide text-[#e6bf6a]">
              Opening Hours
            </p>
            <p className="mt-1 font-semibold text-white">Mon – Sun</p>
            <p className="text-[#e6bf6a]">9:00 AM – 8:00 PM</p>
          </div>

          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:border-white hover:text-[#e6bf6a]"
              >
                {social.name === "Instagram" ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="5" />
                    <circle cx="12" cy="12" r="3.3" />
                    <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
